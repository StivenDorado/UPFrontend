import React, { useState } from "react";
import { Modal } from "./Modal";

interface DateTimeSelection {
  date: Date | null;
  time: string;
  amPm: "AM" | "PM";
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointmentData: DateTimeSelection) => void;
}

// Se reutilizan los componentes Calendar y TimeSelector para la selección de fecha y hora

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

    // Espacios en blanco para los días previos
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-10 flex items-center justify-center"
        />
      );
    }
    // Días del mes
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
          {currentMonth.toLocaleDateString("default", {
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
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Seleccionar hora</h3>
      <div className="flex items-center gap-2">
        <select
          value={selectedTime.split(":")[0]}
          onChange={(e) =>
            onTimeChange(`${e.target.value}:${selectedTime.split(":")[1]}`)
          }
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
          onChange={(e) =>
            onTimeChange(`${selectedTime.split(":")[0]}:${e.target.value}`)
          }
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
}) => {
  const [selection, setSelection] = useState<DateTimeSelection>({
    date: null,
    time: "09:00",
    amPm: "AM",
  });

  const handleSave = () => {
    if (selection.date) {
      onSave(selection);
      onClose();
    } else {
      alert("Por favor, selecciona una fecha para tu cita");
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
          <label className="block mb-2 font-medium">
            Fecha y hora seleccionadas:
          </label>
          <div className="p-3 bg-white rounded border border-gray-300">
            {selection.date
              ? selection.date.toLocaleDateString()
              : "No se ha seleccionado fecha"}{" "}
            a las {selection.time} {selection.amPm}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="py-2 px-6 border border-gray-300 bg-white rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="py-2 px-6 bg-teal-500 text-white rounded"
            onClick={handleSave}
          >
            Guardar Cita
          </button>
        </div>
      </div>
    </Modal>
  );
};
