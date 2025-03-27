import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, X, MessageSquare, Check } from 'lucide-react';

const AppointmentStatus = {
  WAITING: 'waiting',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted'
};

const SolicitudesCitas = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Refresh appointment status
  const refreshAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/refresh`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to refresh appointment');
      }
      const updatedAppointment = await response.json();
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? updatedAppointment : apt
        )
      );
    } catch (err) {
      console.error('Refresh error:', err);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/cancel`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? {...apt, status: AppointmentStatus.CANCELLED} 
            : apt
        )
      );
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  // Accept appointment
  const acceptAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/accept`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to accept appointment');
      }
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? {...apt, status: AppointmentStatus.ACCEPTED} 
            : apt
        )
      );
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full bg-red-100 p-4 text-red-700 flex items-center justify-between">
        <span>Error: {error}</span>
        <button 
          onClick={fetchAppointments} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 flex items-center"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">SOLICITUDES & CITAS</h2>
        </div>
        <button 
          onClick={fetchAppointments}
          className="text-white hover:bg-teal-700 p-2 rounded-full transition-colors duration-300 group"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
      
      {/* Appointments Container */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
        {appointments.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No hay citas programadas
          </div>
        ) : (
          appointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className={`border-b border-gray-200 p-4 ${
                appointment.status === AppointmentStatus.CANCELLED 
                  ? 'opacity-50' 
                  : ''
              }`}
            >
              <div className="flex items-center">
                {/* Avatar circle */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4 shadow-sm"></div>
                
                {/* Appointment info */}
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{appointment.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{appointment.date}</span>
                  </div>
                  
                  <div className="mt-1">
                    <p className="text-gray-700">{appointment.day}</p>
                    <p className="text-gray-700">
                      {appointment.status === AppointmentStatus.WAITING && 'Esperando cita...'}
                      {appointment.status === AppointmentStatus.CANCELLED && 'Cita cancelada'}
                      {appointment.status === AppointmentStatus.ACCEPTED && 'Cita aceptada'}
                    </p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <span className="text-sm">
                        <span className="inline-block mr-1">⏰</span> 
                        Hora cita: {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => refreshAppointment(appointment.id)}
                    className="text-teal-600 rounded-full bg-teal-50 p-2 hover:bg-teal-100 transition-colors duration-300 group"
                  >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                  
                  {appointment.status === AppointmentStatus.WAITING && (
                    <>
                      <button 
                        onClick={() => cancelAppointment(appointment.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center hover:bg-red-100 transition-colors duration-300 group"
                      >
                        <X className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                        <span>Cancelar cita</span>
                      </button>
                      <button 
                        onClick={() => acceptAppointment(appointment.id)}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <Check className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                        <span>Aceptar cita</span>
                      </button>
                    </>
                  )}
                  
                  {appointment.status === AppointmentStatus.CANCELLED && (
                    <button 
                      className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg flex items-center cursor-not-allowed opacity-70"
                      disabled
                    >
                      <X className="w-4 h-4 mr-1" />
                      <span>Cita Cancelada</span>
                    </button>
                  )}
                  
                  {appointment.status === AppointmentStatus.ACCEPTED && (
                    <button 
                      className="bg-teal-100 text-teal-700 px-4 py-2 rounded-lg flex items-center cursor-not-allowed opacity-70"
                      disabled
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>Cita Aceptada</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SolicitudesCitas;  