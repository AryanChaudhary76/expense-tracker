
import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashBoard({budgetlist}) {
  return (
    <div className='border rounded-l-lg p-5'>
    <h2 className='font-bold text-2xl'>Activites</h2>
    <ResponsiveContainer width={'80%'} height={300}>
    <BarChart 
    
    data={budgetlist} 
    margin={ {
              top:5,
              right:5,
              bottom:5,
              left:10}}>
    <XAxis dataKey='name'></XAxis>
    <YAxis></YAxis>
    <Tooltip></Tooltip>
    <Legend></Legend>
    <Bar dataKey="totalSpend" stackId="a" fill='#4845d2'></Bar>
    <Bar dataKey="amount" stackId="a" fill='#C3C2FF'></Bar>

      
    </BarChart>
    </ResponsiveContainer>
    

    </div>
  )
}

export default BarChartDashBoard
