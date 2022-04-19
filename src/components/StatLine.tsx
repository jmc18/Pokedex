import React from 'react'
import { View } from 'react-native'

interface IStatsProps {
  number: number | undefined
  color: string | undefined
}

const StatLine: React.FC<IStatsProps> = ({ number, color }) => {
  return <View style={{ width: number, marginVertical: 6, height: 5, marginLeft: 10, borderRadius: 5, backgroundColor: color }}></View>
}

export default StatLine
