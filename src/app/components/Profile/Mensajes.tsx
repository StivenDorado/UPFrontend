import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Send, Search, Paperclip, Smile, Phone, Video, Info } from 'lucide-react';

interface Message {
  sender: string;
  text: string;
  time: string;
  isMe?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  active?: boolean;
}

const Mensajes: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'María González', text: '¿Cuándo podría visitar la propiedad?', time: '08:23' },
    { sender: 'Tú', text: 'Claro, es un apartamento de 2 habitaciones en el centro', time: '08:53', isMe: true },
    { sender: 'María González', text: '¿Tiene estacionamiento?', time: '09:38' },
    { sender: 'Tú', text: 'Sí, incluye un espacio de estacionamiento', time: '09:43', isMe: true },
  ]);
  
  const [newMessage, setNewMessage] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, name: 'María González', lastMessage: '¿Cuándo podría visitar la propiedad?', time: '08:23', unread: 1, active: true },
    { id: 2, name: 'Carlos Ramírez', lastMessage: 'Gracias por la información', time: 'Ayer', unread: 0 },
    { id: 3, name: 'Laura Sánchez', lastMessage: '¿Hay un supermercado cerca?', time: 'Lun', unread: 2 }
  ]);

  const handleSendMessage = (): void => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        sender: 'Tú', 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        isMe: true 
      }]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Mensajes</h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Conversations list */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className={`p-3 flex items-center hover:bg-gray-100 cursor-pointer ${conversation.active ? 'bg-gray-100' : ''}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.name.charAt(0)}
                  </div>
                  {conversation.active && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{conversation.name}</span>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="border-b border-gray-200 p-3 flex items-center justify-between bg-white shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div>
              <div className="ml-3">
                <p className="font-medium">María González</p>
                <p className="text-xs text-green-500">En línea</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-500 hover:text-teal-600">
                <Phone size={20} />
              </button>
              <button className="text-gray-500 hover:text-teal-600">
                <Video size={20} />
              </button>
              <button className="text-gray-500 hover:text-teal-600">
                <Info size={20} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                  {!message.isMe && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                      M
                    </div>
                  )}
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isMe 
                        ? 'bg-teal-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 text-right ${message.isMe ? 'text-teal-200' : 'text-gray-400'}`}>
                      {message.time}
                      {message.isMe && (
                        <span className="ml-1">✓✓</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-teal-600 mr-2">
                <Paperclip size={20} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un mensaje..."
                  className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 max-h-32 min-h-[45px] resize-y"
                  rows={1}
                />
                <button className="absolute right-3 bottom-3 text-gray-500 hover:text-teal-600">
                  <Smile size={20} />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`ml-2 p-2 rounded-full ${
                  newMessage.trim() ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;