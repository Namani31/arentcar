import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { refreshAccessToken, handleLogout } from 'common/Common';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RvCharts = ( {stats} ) => {
  const data = [
    {name:"1월",count:1},
    {name:"2월",count:2},
    {name:"3월",count:3},
    {name:"4월",count:4},
    {name:"5월",count:5},
  ]

  const data2 = [
    {name:"20대",count:6},
    {name:"30대",count:3},
    {name:"40대",count:4},
    {name:"50대",count:5},
  ]
  
  return (<div> 
    RvCharts {stats} 데이터 미삽입
    <ResponsiveContainer width="100%" height={400}>
      {stats === 0 && (
        <BarChart data={data}>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b70d6" />
        </BarChart>
      )}
      {stats === 1 && (
        <BarChart data={data2}>
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b70d6" />
        </BarChart>
      )}


    </ResponsiveContainer>
  </div>);
}

const AvgCharts = ( {stats} ) => {
  const data = [
    {name:"1월",count:7},
    {name:"2월",count:4},
    {name:"3월",count:8},
    {name:"4월",count:2},
    {name:"5월",count:9},
  ]

  const data2 = [
    {name:"20대",count:9},
    {name:"30대",count:3},
    {name:"40대",count:6},
    {name:"50대",count:2},
  ]

  return (<div>
    AvgCharts {stats} 데이터 미삽입
    <ResponsiveContainer width="100%" height={400}>
    {stats === 0 && (
      <LineChart data={data}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Line dataKey="count" strokeWidth={3} />
      </LineChart> 
    )}
    {stats === 1 && (
      <BarChart data={data2}>
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b70d6" />
      </BarChart>
    )}


    </ResponsiveContainer>
  </div>);
}

export { AvgCharts, RvCharts };