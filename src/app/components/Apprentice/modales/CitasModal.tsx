import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { auth } from "../../../../../firebase"; // Ajustar la ruta según tu estructura
import { useAuthState } from "react-firebase-hooks/auth";

// -----------------------------------------------------------------------------
// 1. Definiciones de Tipos
// -----------------------------------------------------------------------------
interface AppointmentData {
  usuario_uid: string;
  propiedad_id: string | number;
  fecha: string;   // Formato "YYYY-MM-DD"
  hora: string;    // Formato "HH:mm:ss"
}

// -----------------------------------------------------------------------------
// 2. Componente Calendar: para seleccionar la fecha
// -----------------------------------------------------------------------------
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
        <div key={`empty-${i}`} className="h-10 flex items-center justify-center" />
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
          className={`h-10 flex items-center justify-center cursor-pointer rounded-full transition duration-200 
            ${isSelected ? "bg-teal-500 text-white" : "hover:bg-teal-200"}`}
          onClick={() => onDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

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

// -----------------------------------------------------------------------------
// 3. Componente TimeSelector: para seleccionar la hora y AM/PM
// -----------------------------------------------------------------------------
const TimeSelector: React.FC<{
  selectedTime: string;         // Ej: "09:00"
  selectedAmPm: "AM" | "PM";
  onTimeChange: (time: string) => void;
  onAmPmChange: (amPm: "AM" | "PM") => void;
}> = ({ selectedTime, selectedAmPm, onTimeChange, onAmPmChange }) => {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Seleccionar hora</h3>
      <div className="flex items-center gap-2">
        {/* Selector de Horas */}
        <select
          value={selectedTime.split(":")[0]} 
          onChange={(e) => {
            const newHour = e.target.value;
            const currentMinute = selectedTime.split(":")[1];
            onTimeChange(`${newHour}:${currentMinute}`);
          }}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        
        <span>:</span>
        
        {/* Selector de Minutos */}
        <select
          value={selectedTime.split(":")[1]}
          onChange={(e) => {
            const newMinute = e.target.value;
            const currentHour = selectedTime.split(":")[0];
            onTimeChange(`${currentHour}:${newMinute}`);
          }}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>

        {/* Botones AM/PM */}
        <div className="flex ml-3">
          <button
            className={`py-2 px-3 border border-teal-500 bg-white text-teal-500 rounded-l 
              ${selectedAmPm === "AM" ? "bg-teal-500 text-white" : ""}`}
            onClick={() => onAmPmChange("AM")}
          >
            AM
          </button>
          <button
            className={`py-2 px-3 border border-teal-500 bg-white text-teal-500 rounded-r 
              ${selectedAmPm === "PM" ? "bg-teal-500 text-white" : ""}`}
            onClick={() => onAmPmChange("PM")}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 4. Componente AppointmentModal: para programar la cita
// -----------------------------------------------------------------------------
interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string | number; // Mantenemos como opcional para mejor manejo de errores
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  propertyId: externalPropertyId, // Renombramos para claridad
}) => {
  // Usar Firebase Auth para obtener el usuario actual
  const [user, loadingUser] = useAuthState(auth);
  
  // Estado interno para el ID de la propiedad (respaldo)
  const [propertyId, setPropertyId] = useState<string | number | null>(null);
  
  // Estado para manejar los datos del formulario
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [selectedAmPm, setSelectedAmPm] = useState<"AM" | "PM">("AM");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Intentar obtener el ID de la propiedad de la URL si no se proporciona como prop
  useEffect(() => {
    // Si tenemos un ID proporcionado externamente, lo usamos
    if (externalPropertyId) {
      setPropertyId(externalPropertyId);
      return;
    }

    // De lo contrario, intentamos obtener el ID de la URL
    try {
      // Extraer el ID de la URL (asume un formato como /PropertyPage/123)
      const urlSegments = window.location.pathname.split('/');
      const idFromUrl = urlSegments[urlSegments.length - 1];
      
      // Verificar si es un ID válido (número o string no vacío)
      if (idFromUrl && (parseInt(idFromUrl) || idFromUrl.length > 0)) {
        console.log("ID obtenido de la URL:", idFromUrl);
        setPropertyId(idFromUrl);
      } else {
        console.warn("No se pudo extraer un ID válido de la URL");
      }
    } catch (error) {
      console.error("Error al intentar obtener el ID de la URL:", error);
    }
  }, [externalPropertyId, isOpen]);

  // Efecto para reiniciar el estado cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setApiError(null);
      setSelectedDate(null);
      setSelectedTime("09:00");
      setSelectedAmPm("AM");
      
      // Verificar si tenemos un ID de propiedad
      if (!propertyId && !externalPropertyId) {
        console.error("Error: propertyId no está disponible", { 
          externalPropertyId, 
          propertyId, 
          url: window.location.pathname 
        });
        setApiError("No se ha especificado el ID de la propiedad.");
      }
    }
  }, [isOpen, propertyId, externalPropertyId]);

  // Función para convertir la fecha seleccionada (Date) al formato "YYYY-MM-DD"
  const formatFecha = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  // Función para convertir la hora seleccionada (ej: "09:30" AM) al formato de 24h ("09:30:00")
  const formatHora = (time: string, amPm: "AM" | "PM"): string => {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    // Reglas de conversión 12h -> 24h
    if (amPm === "PM" && hour !== 12) {
      hour += 12;
    }
    if (amPm === "AM" && hour === 12) {
      hour = 0;
    }

    // Aseguramos dos dígitos
    const hourFormatted = hour.toString().padStart(2, "0");
    const minuteFormatted = minute.toString().padStart(2, "0");

    return `${hourFormatted}:${minuteFormatted}:00`;
  };

  const handleCreateAppointment = async () => {
    try {
      if (!user) {
        setApiError("Debes iniciar sesión para programar una cita.");
        return;
      }

      if (!selectedDate) {
        setApiError("Por favor, selecciona una fecha.");
        return;
      }

      const finalPropertyId = propertyId || externalPropertyId;
      
      if (!finalPropertyId) {
        setApiError("No se ha especificado el ID de la propiedad.");
        return;
      }

      // Construimos el objeto final que se enviará al backend
      const appointmentData: AppointmentData = {
        usuario_uid: user.uid,
        propiedad_id: finalPropertyId,
        fecha: formatFecha(selectedDate),
        hora: formatHora(selectedTime, selectedAmPm),
      };

      console.log("Enviando cita al backend:", appointmentData);

      setApiError(null);
      setIsLoading(true);

      const response = await fetch("http://localhost:4000/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      let responseData: any;
      try {
        responseData = await response.json();
      } catch (error) {
        // Si no se puede parsear JSON, intentamos leer texto
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          responseData?.error || 
          responseData?.mensaje || 
          `Error del servidor: ${response.status} ${response.statusText}`
        );
      }

      alert("Cita creada exitosamente");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("Error desconocido al crear la cita");
      }
      console.error("Error al crear cita:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar mensaje si no hay usuario autenticado
  if (!loadingUser && !user) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Programar Visita">
        <div className="p-4">
          <div className="p-3 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded mb-4">
            <p>Debes iniciar sesión para programar una visita al alojamiento.</p>
          </div>
          <div className="flex justify-end">
            <button 
              className="py-2 px-6 bg-teal-500 text-white rounded"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  const finalPropertyId = propertyId || externalPropertyId;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Programar Visita">
      <div className="p-4">
        {/* Mensaje informativo sobre la visita */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800">
            Elige el día y la hora para visitar este alojamiento. Te confirmaremos la visita y nos pondremos en contacto contigo.
          </p>
        </div>

        {/* Componente de Calendario para escoger fecha */}
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={(date) => setSelectedDate(date)}
        />

        {/* Componente de Selección de Hora */}
        <TimeSelector
          selectedTime={selectedTime}
          selectedAmPm={selectedAmPm}
          onTimeChange={setSelectedTime}
          onAmPmChange={setSelectedAmPm}
        />

        {/* Resumen de la selección */}
        {selectedDate && (
          <div className="mb-6 p-3 bg-teal-50 rounded-lg border border-teal-100">
            <p className="text-teal-800 font-medium">
              Has seleccionado: {selectedDate.toLocaleDateString('es-ES')} a las {selectedTime} {selectedAmPm}
            </p>
            {finalPropertyId && (
              <p className="text-teal-600 text-sm mt-1">
                Propiedad ID: {finalPropertyId}
              </p>
            )}
          </div>
        )}

        {/* Mensaje de error */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            <p><strong>Error:</strong> {apiError}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="py-2 px-6 border border-gray-300 bg-white rounded"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="py-2 px-6 bg-teal-500 text-white rounded disabled:opacity-50"
            onClick={handleCreateAppointment}
            disabled={isLoading || !selectedDate || !finalPropertyId}
          >
            {isLoading ? "Guardando..." : "Crear Visita"}
          </button>
        </div>
      </div>
    </Modal>
  );
};