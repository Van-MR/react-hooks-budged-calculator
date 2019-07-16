import React,{ useState }from 'react';
import uuid from 'uuid/v4'
import './App.css';
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
const App  = () => {

  const [expenses,setExpences] = useState([
    {id:uuid(),charge:'car payment',amount:'1200'},
    {id:uuid(),charge:'travel cost',amount:'4000'},
    {id:uuid(),charge:'buy computer',amount:'3000'}
  ])

  const [charge,setCharge] = useState('')

  const handleCharge = e => {
      setCharge(e.target.value)
  }

  const [amount,setAmount] = useState('')

  const handleAmount = e => {
    setAmount(e.target.value)
  }

  const handleSubmit = e => {
     e.preventDefault()
      if(charge !== '' && amount > 0){
        if(edit){
           let tempExpenses = expenses.map(item => {
              return item.id  == id ? {...item,charge,amount} : item
           })
           setExpences(tempExpenses)
           setEdit(false)
         }else{
            setExpences([...expenses,{id:uuid(),charge,amount}])
            setAlert({show:true,type:'success',message:'add item success'})

            setTimeout(() => {
              setAlert({show:false})
            },1500)
        }
        setCharge('')
        setAmount('')
       }else{
         setAlert({show:true,type:'danger',message:'change can not be null && amount must larger than 0'})
         setTimeout(() => {
           setAlert({show:false})
         },1500)
       }
  }

  const handleDelete = id => {
      let curExpenses = expenses.filter(item => item.id !== id)
      setExpences(curExpenses)
      setAlert({show:true,type:'danger',message:'item deleted'})

      setTimeout(() => {
        setAlert({show:false})
      },1500)
  }

  const [alert,setAlert] = useState({show:false})

  const clearItems = () => {
    setExpences([])
  }

  const [id,setId] = useState('')

  const [edit,setEdit] = useState(false)

  const handleEdit = id => {
     const editItem = expenses.find(item => item.id === id)
     const { charge, amount } = editItem
     setCharge(charge)
     setAmount(amount)
     setEdit(true)
     setId(id)
  }

  return (
    <React.Fragment>
         {alert.show && <Alert type={alert.type} message={alert.message}/>}
         <h1>budget calculator</h1>
         <main  className="App">
           <ExpenseForm charge={charge} amount={amount} edit={edit} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit}/>
           <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}/>
         </main>
         <h1>
            total spending :
            <span className="total">
              ${expenses.reduce((acc,curr) => {return acc + parseInt(curr.amount)},0)}
            </span>
          </h1>
    </React.Fragment>
  );
}

export default App;
