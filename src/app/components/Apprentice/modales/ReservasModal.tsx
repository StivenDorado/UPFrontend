import React, { useState } from "react";
import { Modal } from "./Modal";

interface ReservationData {
  arrivalDate: Date | null;
  departureDate: Date | null;
  arrivalTime: string;
  amPm: "AM" | "PM";
  guests: number;
  precio_total: number; // Nuevo campo
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservationData: ReservationData) => void;
}

const Calendar: React.FC<{
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}> = ({ selectedDate, onDateSelect }) => {
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
}) => {
  const [reservationData, setReservationData] = useState<ReservationData>({
    arrivalDate: null,
    departureDate: null,
    arrivalTime: "10:00",
    amPm: "AM",
    guests: 1,
    precio_total: 0, // Campo precio_total agregado
  });

  const [activeCalendar, setActiveCalendar] = useState<"arrival" | "departure">(
    "arrival"
  );

  const handleDateSelect = (date: Date) => {
    if (activeCalendar === "arrival") {
      setReservationData({ ...reservationData, arrivalDate: date });
    } else {
      setReservationData({ ...reservationData, departureDate: date });
    }
  };

  const handleSave = () => {
    if (!reservationData.arrivalDate) {
      alert("Por favor selecciona una fecha de llegada");
      return;
    }
    if (reservationData.precio_total <= 0) {
      alert("Por favor ingresa el precio total");
      return;
    }
    onSave(reservationData);
    onClose();
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
          selectedDate={reservationData.arrivalDate}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 p-3 bg-white rounded border border-gray-300">
            <span className="font-bold mr-2">Precio Total:</span>
            {reservationData.totalPrice
              ? `$${reservationData.totalPrice.toFixed(2)}`
              : "Calculando..."}
          </div>
        </div>
          
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="py-2 px-6 border border-gray-300 bg-white rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="py-2 px-6 bg-teal-500 text-white rounded"
            onClick={handleSave}
          >
            Enviar reservación
          </button>
        </div>
      </div>
    </Modal>
  );
};
