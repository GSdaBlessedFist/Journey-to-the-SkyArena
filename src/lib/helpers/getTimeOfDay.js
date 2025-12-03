// lib/helpers/getTimeOfDay.js

export function getTimeOfDay() {
  const hour = new Date().getHours()
  // const hour = 9
  if (hour >= 8 && hour < 18) {
    return { label: 'day', lightSetting: LIGHTS.day } 
  }
  return { label: 'night', lightSetting: LIGHTS.night }
}


export const LIGHTS = {
  day: {
    bgBottom: '#80b9ff',
    bgTop: '#f8fbff',
    //bgColor:'#80b9ff',
    ambientColor: '#80b9ff',
    ambientIntensity: .75,
    bloomIntensity: 0.3,
    sceneTitle:{
      mainLight:{
        color: '#FF0000',
        intensity: 10
      }
    }
  },
  night: {
    bgBottom: '#00133d',
    bgTop: '#000000',
    //bgColor:"#1834c3",
    ambientColor: '#1834c3',
    ambientIntensity: .15,
    bloomIntensity: 1.1,
    sceneTitle: {
      mainLight: {
        color: '#FF0000',
        intensity: 5
      }
    }
  }
}


