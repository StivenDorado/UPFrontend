import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { auth } from "../../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface ReservationData {
  arrivalDate: Date | null;
  departureDate: Date | null;
  arrivalTime: string;
  amPm: "AM" | "PM";
  guests: number;
  precio_total: number;
  observaciones?: string;
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservationData: ReservationData) => void;
  propertyId?: string;
}

const Calendar: React.FC<{
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}> = ({ selectedDate, onDateSelect }) => {
  // Componente Calendar existente sin cambios
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-10 flex items-center justify-center"
        />
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 flex items-center justify-center cursor-pointer rounded-full transition duration-200 ${
            isSelected ? "bg-teal-500 text-white" : "hover:bg-teal-200"
          }`}
          onClick={() => onDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="bg-teal-500 hover:bg-teal-600 rounded-full w-9 h-9 flex items-center justify-center text-white"
        >
          &lt;
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={nextMonth}
          className="bg-teal-500 hover:bg-teal-600 rounded-full w-9 h-9 flex items-center justify-center text-white"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
};

const TimeSelector: React.FC<{
  selectedTime: string;
  selectedAmPm: "AM" | "PM";
  onTimeChange: (time: string) => void;
  onAmPmChange: (amPm: "AM" | "PM") => void;
}> = ({ selectedTime, selectedAmPm, onTimeChange, onAmPmChange }) => {
  // Componente TimeSelector existente sin cambios
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Seleccionar hora de llegada
      </h3>
      <div className="flex items-center gap-2">
        <select
          value={selectedTime.split(":")[0]}
          onChange={(e) =>
            onTimeChange(`${e.target.value}:${selectedTime.split(":")[1]}`)
          }
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          value={selectedTime.split(":")[1]}
          onChange={(e) =>
            onTimeChange(`${selectedTime.split(":")[0]}:${e.target.value}`)
          }
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <div className="flex ml-3">
          <button
            className={`py-2 px-3 border border-teal-500 bg-white text-teal-500 rounded-l ${
              selectedAmPm === "AM" ? "bg-teal-500 text-white" : ""
            }`}
            onClick={() => onAmPmChange("AM")}
          >
            AM
          </button>
          <button
            className={`py-2 px-3 border border-teal-500 bg-white text-teal-500 rounded-r ${
              selectedAmPm === "PM" ? "bg-teal-500 text-white" : ""
            }`}
            onClick={() => onAmPmChange("PM")}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  propertyId,
}) => {
  const [user] = useAuthState(auth);
  const [reservationData, setReservationData] = useState<ReservationData>({
    arrivalDate: null,
    departureDate: null,
    arrivalTime: "10:00",
    amPm: "AM",
    guests: 1,
    precio_total: 0,
    observaciones: "",
  });

  const [propertyPrice, setPropertyPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState<"arrival" | "departure">(
    "arrival"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    if (isOpen && propertyId) {
      const fetchPropertyPrice = async () => {
        setLoadingPrice(true);
        try {
          const res = await fetch(
            `http://localhost:4000/api/propiedades/publicacion/${propertyId}`
          );
          if (!res.ok) throw new Error("No se pudo cargar la propiedad");

          const data = await res.json();
          setPropertyPrice(data.precio);
          setReservationData((prev) => ({
            ...prev,
            precio_total: data.precio || 0,
          }));
        } catch (error) {
          console.error("Error al cargar el precio:", error);
        } finally {
          setLoadingPrice(false);
        }
      };

      fetchPropertyPrice();
    }
  }, [isOpen, propertyId]);

  const handleDateSelect = (date: Date) => {
    if (activeCalendar === "arrival") {
      setReservationData({ ...reservationData, arrivalDate: date });
    } else {
      setReservationData({ ...reservationData, departureDate: date });
    }
  };

  const calculateTotalPrice = () => {
    if (!propertyPrice) return 0;

    if (!reservationData.arrivalDate || !reservationData.departureDate) {
      return propertyPrice;
    }

    const startDate = new Date(reservationData.arrivalDate);
    const endDate = new Date(reservationData.departureDate);

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();

    const totalMonths = Math.max(1, months);
    return totalMonths * propertyPrice;
  };

  // Función para formatear la hora en formato de 24 horas para el backend
  const formatTimeFor24Hour = (time: string, amPm: "AM" | "PM"): string => {
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    let hour24 = hours;
    
    if (amPm === "PM" && hours < 12) {
      hour24 = hours + 12;
    } else if (amPm === "AM" && hours === 12) {
      hour24 = 0;
    }
    
    return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  const handleSave = async () => {
    if (!reservationData.arrivalDate) {
      alert("Por favor selecciona una fecha de llegada");
      return;
    }

    if (!user) {
      alert("Debes estar autenticado para hacer una reservación");
      return;
    }

    if (!propertyId) {
      alert("No se ha especificado la propiedad a reservar");
      return;
    }

    let departureDate = reservationData.departureDate;
    if (!departureDate && reservationData.arrivalDate) {
      const date = new Date(reservationData.arrivalDate);
      date.setMonth(date.getMonth() + 1);
      departureDate = date;
    }

    const totalPrice = calculateTotalPrice();
    
    setIsSubmitting(true);
    try {
      // Formateamos la hora de llegada para el backend
      const hora_llegada = formatTimeFor24Hour(
        reservationData.arrivalTime, 
        reservationData.amPm
      );
      
      const requestBody = {
        usuario_uid: user.uid,
        propiedad_id: propertyId,
        fecha_inicio: reservationData.arrivalDate.toISOString().split('T')[0],
        fecha_fin: departureDate?.toISOString().split('T')[0],
        hora_llegada: hora_llegada,
        monto_reserva: totalPrice,
        observaciones: observaciones || undefined
      };
      
      console.log("Enviando datos de reserva:", requestBody);

      const response = await fetch("http://localhost:4000/api/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Error del servidor:", responseData);
        throw new Error(responseData.message || responseData.error || "Error al crear la reserva");
      }

      console.log("Reserva creada exitosamente:", responseData);
      alert("¡Reserva creada exitosamente!");
      
      onSave({
        ...reservationData,
        departureDate: departureDate || null,
        precio_total: totalPrice,
        observaciones: observaciones
      });
      onClose();
      
    } catch (error) {
      console.error("Error completo:", error);
      alert(error.message || "Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hacer una reservación">
      <div>
        <div className="flex mb-4">
          <button
            className={`flex-1 p-3 border border-gray-300 bg-white rounded-l ${
              activeCalendar === "arrival"
                ? "bg-teal-500 text-white border-teal-500"
                : ""
            }`}
            onClick={() => setActiveCalendar("arrival")}
          >
            Fecha de llegada
          </button>
          <button
            className={`flex-1 p-3 border border-gray-300 bg-white rounded-r ${
              activeCalendar === "departure"
                ? "bg-teal-500 text-white border-teal-500"
                : ""
            }`}
            onClick={() => setActiveCalendar("departure")}
          >
            Fecha de salida
          </button>
        </div>
        <Calendar
          selectedDate={
            activeCalendar === "arrival"
              ? reservationData.arrivalDate
              : reservationData.departureDate
          }
          onDateSelect={handleDateSelect}
        />
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-3 bg-white rounded border border-gray-300">
            <span className="font-bold mr-2">Llegada:</span>
            {reservationData.arrivalDate
              ? reservationData.arrivalDate.toLocaleDateString("es-ES")
              : "No seleccionada"}
          </div>
          <div className="flex-1 p-3 bg-white rounded border border-gray-300">
            <span className="font-bold mr-2">Salida:</span>
            {reservationData.departureDate
              ? reservationData.departureDate.toLocaleDateString("es-ES")
              : "No seleccionada"}
          </div>
        </div>
        <TimeSelector
          selectedTime={reservationData.arrivalTime}
          selectedAmPm={reservationData.amPm}
          onTimeChange={(time) =>
            setReservationData({ ...reservationData, arrivalTime: time })
          }
          onAmPmChange={(amPm) =>
            setReservationData({ ...reservationData, amPm })
          }
        />
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Observaciones
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Agrega cualquier detalle importante sobre tu reserva"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            rows={3}
          />
        </div>
        <div className="mb-6">
          <div className="p-3 bg-white rounded border border-gray-300">
            <span className="font-bold mr-2">Precio Mensual:</span>
            {loadingPrice ? (
              "Cargando..."
            ) : (
              `$${propertyPrice?.toLocaleString() || 0} COP`
            )}
          </div>
          <div className="p-3 bg-white rounded border border-gray-300 mt-2">
            <span className="font-bold mr-2">Precio Total:</span>
            {loadingPrice ? (
              "Calculando..."
            ) : (
              `$${calculateTotalPrice().toLocaleString()} COP`
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="py-2 px-6 border border-gray-300 bg-white rounded"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            className={`py-2 px-6 bg-teal-500 text-white rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar reservación"}
          </button>
        </div>
      </div>
    </Modal>
  );
};