import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
/* eslint-disable no-unused-vars */
import { Chart as ChartJS } from 'chart.js/auto'
import Loader from './Loader'
import './LineChart.css'

const LineChart = ({ ticker, id }) => {
    const [fontSize, setFontSize] = useState(14);
    const [pointRadius, setPointRadius] = useState(6);

    useEffect(() => {
        const responsiveFonts = () => {
            if (window.innerWidth > 660) {
                setFontSize(14)
                setPointRadius(6)
            }
            if (window.innerWidth < 660) {
                setFontSize(10)
                setPointRadius(5)
            }
        }
        responsiveFonts()
    })

    const openDetail = async (element) => {
        if (element.length > 0) {
            const date = ticker.funds.total.dates[element[0].index]
            window.open(`/point/${id}/${date}`, '_blank', 'noopener,noreferrer')
        }
    }

    const data = {
        labels: ticker.funds.total.dates,
        datasets: [{
            label: "Total",
            data: ticker.funds.total.qty,
            borderColor: 'rgba(0, 98, 255, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0, 98, 255, 1)',
            pointRadius: pointRadius,
            pointHoverRadius: pointRadius + 2,
            fill: false,
            tension: 0
        },
        {
            label: "Promedio",
            data: ticker.funds.avg.qty,
            borderColor: 'rgba(0, 174, 232, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0, 174, 232, 1)',
            pointRadius: pointRadius,
            pointHoverRadius: pointRadius + 2,
            fill: false,
            tension: 0,
            hidden: true
        }]
    }

    const responsiveFonts = () => {
        if (window.outerWidth < 660) {
            setFontSize(1)
            setPointRadius(5)
        }
    }

    return (
        <>
            <div className='linechart-container'>
                <Line
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                ticks: {
                                    color: '#000000',
                                    font: {
                                        size: fontSize,
                                        weight: 'bolder'
                                    },
                                    callback: function(value, index, values) {
                                        if (value >= 1e6) {
                                            return value / 1e6 + 'M';
                                        } else if (value >= 1e3) {
                                            return value / 1e3 + 'k';
                                        }
                                        return value;
                                    }
                                },
                                grid: {
                                    color: '#404040'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#000000',
                                    font: {
                                        size: fontSize,
                                        weight: 'bolder'
                                    }
                                },
                                grid: {
                                    color: '#404040'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: ticker.name,
                                color: '#000000',
                                font: {
                                    size: 18
                                }
                            },
                            legend: {
                                display: true,
                                onHover: (event, element) => {
                                    event.native.target.style.cursor = 'pointer'
                                }
                            },
                            tooltip: {
                                mode: 'nearest',
                                intersect: true,
                                titleFont: {
                                    size: 16
                                },
                                bodyFont: {
                                    size: 12
                                },
                                callbacks: {
                                    title: (context) => {
                                        return context[0].label
                                    },
                                    label: (context) => {
                                        const newLineArray = []
                                        const index = context.dataIndex
                                        newLineArray.push(`Cantidad: ${context.dataset.data[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
                                        newLineArray.push(`Precio: ${ticker.funds.total.prices[index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
                                        return newLineArray
                                    }
                                },
                                displayColors: false
                            }
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true,
                            
                        },
                        onClick: (event, element) => openDetail(element),
                        onHover: (event, element) => {
                            event.native.target.style.cursor = element[0] ? 'pointer' : 'default'
                        }
                    }}
                />
            </div>
        </>
    )
}

export default LineChart