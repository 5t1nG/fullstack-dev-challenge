import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Props = {
    xAxisData: string[]
    yAxisData: string[]
    title?: string
    xLabel?: string
    yLabel?: string
    color?: string
}

const LineChart = ({ xAxisData, yAxisData, title, xLabel, yLabel, color }: Props) => {
    // Default color if none provided
    const chartColor = color || '#e91e63';
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 18,
                    weight: 'bold' as const,
                    family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif",
                },
                color: '#000000',
                padding: 20
            },
            tooltip: {
                backgroundColor: '#000000',
                titleFont: {
                    size: 16,
                    weight: 'bold' as const,
                    family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                },
                bodyFont: {
                    size: 14,
                    family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                },
                padding: 12,
                cornerRadius: 8,
                caretSize: 10,
                displayColors: false,
                callbacks: {
                    label: function(context: any) {
                        return `$${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: !!yLabel,
                    text: yLabel,
                    font: {
                        size: 16,
                        weight: 'bold' as const,
                        family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                    },
                    color: '#000000'
                },
                grid: {
                    display: true,
                    color: '#e0e0e0',
                    borderDash: [5, 5],
                    drawBorder: true,
                    borderWidth: 3,
                    borderColor: '#000000'
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold' as const,
                        family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                    },
                    color: '#000000',
                    callback: function(value: any) {
                        return '$' + value.toLocaleString();
                    },
                    padding: 10
                }
            },
            x: {
                title: {
                    display: !!xLabel,
                    text: xLabel,
                    font: {
                        size: 16,
                        weight: 'bold' as const,
                        family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                    },
                    color: '#000000',
                    padding: 10
                },
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold' as const,
                        family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif"
                    },
                    color: '#000000',
                    padding: 10
                }
            },
        },
        elements: {
            line: {
                tension: 0.3,
                borderWidth: 6,
                fill: true,
            },
            point: {
                radius: 8,
                hoverRadius: 12,
                backgroundColor: 'white',
                borderWidth: 4,
                hitRadius: 30
            }
        }
    };

    return (
        <Line
            data={{
                labels: xAxisData,
                datasets: [
                    {
                        backgroundColor: `${chartColor}40`,
                        borderColor: chartColor,
                        data: yAxisData,
                        pointBackgroundColor: 'white',
                        pointBorderColor: chartColor,
                        pointBorderWidth: 4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.3,
                        borderWidth: 6
                    },
                ],
            }}
            options={options}
            style={{ width: '100%', height: '100%', position: 'relative' }}
        />
    )
}

export default LineChart
