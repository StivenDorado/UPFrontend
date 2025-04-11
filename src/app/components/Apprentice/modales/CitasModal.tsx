import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";

interface DateTimeSelection {
  date: Date | null;
  time: string;
  amPm: "AM" | "PM";
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  usuario_uid: string;
  propiedad_id: string;
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

      // Verificar si la fecha es pasada
      const isDateInPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      
      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 flex items-center justify-center rounded-full transition duration-200 
            ${isSelected ? "bg-teal-500 text-white" : ""} 
            ${isDateInPast 
              ? "text-gray-400 cursor-not-allowed" 
              : "cursor-pointer hover:bg-teal-200"}`}
          onClick={() => !isDateInPast && onDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // No permitir navegar a meses pasados
  const isPrevMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth} 
          disabled={isPrevMonthDisabled()}
          className={`bg-teal-500 rounded-full w-9 h-9 flex items-center justify-center text-white
            ${isPrevMonthDisabled() ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"}`}
        >
          &lt;
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={nextMonth} className="bg-teal-500 hover:bg-teal-600 rounded-full w-9 h-9 flex items-center justify-center text-white">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"].map((dia) => (
          <div key={dia}>{dia}</div>
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
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Seleccionar hora</h3>
      <div className="flex items-center gap-2">
        <select
          value={selectedTime.split(":")[0]}
          onChange={(e) => onTimeChange(`${e.target.value}:${selectedTime.split(":")[1]}`)}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {hours.map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          value={selectedTime.split(":")[1]}
          onChange={(e) => onTimeChange(`${selectedTime.split(":")[0]}:${e.target.value}`)}
          className="p-2 border border-gray-300 rounded bg-white"
        >
          {minutes.map((minuto) => (
            <option key={minuto} value={minuto}>
              {minuto}
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

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  usuario_uid,
  propiedad_id,
}) => {
  const [selection, setSelection] = useState<DateTimeSelection>({
    date: null,
    time: "09:00",
    amPm: "AM",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Reset error when modal opens or closes
  useEffect(() => {
    setApiError(null);
    
    // Establecer fecha inicial al día actual
    if (isOpen) {
      const today = new Date();
      setSelection(prev => ({
        ...prev,
        date: today
      }));
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!selection.date) {
      setApiError("Por favor, selecciona una fecha para tu cita");
      return;
    }

    if (!usuario_uid || !propiedad_id) {
      setApiError("Error: Faltan datos necesarios para agendar la cita");
      return;
    }

    // Verificar que la fecha no sea pasada
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selection.date < currentDate) {
      setApiError("No puedes agendar citas en fechas pasadas");
      return;
    }

    // Convierte la hora a formato de 24 horas para el backend
    const [hour, minute] = selection.time.split(":").map(Number);
    let hours = hour;
    if (selection.amPm === "PM" && hour !== 12) hours += 12;
    if (selection.amPm === "AM" && hour === 12) hours = 0;

    // Formatea la fecha para el API (YYYY-MM-DD)
    const fechaFormatted = selection.date.toISOString().split("T")[0];
    // Formato HH:MM:SS como espera el backend
    const horaFormatted = `${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;

    // Prepara el payload para el backend
    const payload = {
      usuario_uid: usuario_uid,
      propiedad_id: propiedad_id,
      fecha: fechaFormatted,
      hora: horaFormatted
    };

    console.log("Enviando datos a API:", payload);
    setIsLoading(true);
    setApiError(null);

    try {
      // Configuración para CORS
      const res = await fetch("http://localhost:4000/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include", // Para cookies de autenticación si las usas
        body: JSON.stringify(payload)
      });

      // Para depuración
      console.log("Status de la respuesta:", res.status, res.statusText);
      
      // Intenta parsear la respuesta como JSON directamente
      let responseData;
      try {
        responseData = await res.json();
        console.log("Datos de respuesta:", responseData);
      } catch (e) {
        console.error("Error al parsear respuesta JSON:", e);
        const responseText = await res.text();
        console.log("Respuesta del servidor (texto):", responseText);
        responseData = { message: responseText };
      }

      if (!res.ok) {
        throw new Error(
          responseData.error || responseData.mensaje || 
          `Error del servidor: ${res.status} ${res.statusText}`
        );
      }

      setApiError(null);
      alert("✅ Cita agendada con éxito");
      
      if (onSave) onSave();
      onClose();
    } catch (error) {
      console.error("Error al crear cita:", error);
      setApiError(error instanceof Error ? error.message : "Error desconocido al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Programar Cita">
      <div>
        <Calendar
          selectedDate={selection.date}
          onDateSelect={(date) => setSelection({ ...selection, date })}
        />
        <TimeSelector
          selectedTime={selection.time}
          selectedAmPm={selection.amPm}
          onTimeChange={(time) => setSelection({ ...selection, time })}
          onAmPmChange={(amPm) => setSelection({ ...selection, amPm })}
        />
        <div className="mb-4">
          <label className="block mb-2 font-medium">Fecha y hora seleccionadas:</label>
          <div className="p-3 bg-white rounded border border-gray-300">
            {selection.date
              ? selection.date.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "No se ha seleccionado fecha"}{" "}
            a las {selection.time} {selection.amPm}
          </div>
        </div>
        
        {/* Mostrar errores de API */}
        {apiError && (
          <div className="p-3 mb-4 bg-red-100 border border-red-300 text-red-700 rounded">
            <p className="font-medium">Error:</p>
            <p>{apiError}</p>
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="py-2 px-6 border border-gray-300 bg-white rounded disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="py-2 px-6 bg-teal-500 text-white rounded disabled:opacity-50"
            onClick={handleSave}
            disabled={isLoading || !selection.date}
          >
            {isLoading ? "Guardando..." : "Guardar Cita"}
          </button>
        </div>
      </div>
    </Modal>
  );
};