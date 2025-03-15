"use client"

import { useState } from "react"

export default function EditableName({ name, setName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(name)

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(tempName)
    setIsEditing(false)
  }

  return (
    <div className="mt-4 text-center">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 px-2 py-1 text-lg font-semibold text-gray-800"
          />
          <button type="submit" className="ml-2 text-blue-600 hover:text-indigo-800 focus:outline-none">
            Save
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 text-blue-600 hover:text-indigo-800 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

