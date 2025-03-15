"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

// Define la interfaz para las props
interface DateTimeModalProps {
  isOpen: boolean; // Indica si el modal está abierto o cerrado
  onOpenChange: (open: boolean) => void; // Función para actualizar el estado de apertura
}

export function DateTimeModal({ isOpen, onOpenChange }: DateTimeModalProps) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("");
  const [period, setPeriod] = React.useState<"AM" | "PM">("AM");

  const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleSelectTime = (value: string) => {
    setTime(value);
  };

  const handleSelectPeriod = (value: "AM" | "PM") => {
    setPeriod(value);
  };

  const formatSelectedDateTime = () => {
    if (!date) return "Fecha de Entrada";

    const formattedDate = format(date, "dd 'de' MMMM, yyyy", { locale: es });
    if (!time) return formattedDate;

    return `${formattedDate} - ${time}:00 ${period}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Seleccionar fecha y hora</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelectDate}
              locale={es}
              className="rounded-md border"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 opacity-70" />
              <span className="text-sm">Hora:</span>
            </div>
            <Select value={time} onValueChange={handleSelectTime}>
              <SelectTrigger>
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={handleSelectPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="w-full" disabled={!date || !time}>
          Confirmar
        </Button>
      </DialogContent>
    </Dialog>
  );
}