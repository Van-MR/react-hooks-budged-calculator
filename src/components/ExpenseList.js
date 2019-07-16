import React from 'react'
import { MdDelete } from 'react-icons/md'
import ExpenseItem from './ExpenseItem'
const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {

  return (
     <>
         <ul className="list">
            {expenses.map(item => {
               return (
                 <ExpenseItem key={item.id} expence={item} handleEdit={handleEdit} handleDelete={handleDelete}></ExpenseItem>
               )
            })}
         </ul>
         {expenses.length > 0 && (
          <button className="btn" onClick={() => clearItems()}>
            clear expenses
            <MdDelete className="btn-icon" />
          </button>
        )}
     </>
  )
}

export default ExpenseList
