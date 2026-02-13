// helpers/fechas.ts

import dayjs, { Dayjs } from "dayjs"

export type RangoFecha = {
  desde: string
  hasta: string
}

export type RangoFechaDayjs = {
  desde: Dayjs
  hasta: Dayjs
}

export const helpers = {
  rangoHoyDayjs(): RangoFechaDayjs {
    const hoy = dayjs()

    return {
      desde: hoy.startOf("day"),
      hasta: hoy.endOf("day"),
    }
  },
    rangoMesActualDayjs(): RangoFechaDayjs {
    const hoy = dayjs()

    return {
      desde: hoy.startOf("month"),
      hasta: hoy.endOf("day"),
    }
  },
  rangoFecha1Mes(): RangoFecha {
    const hoy = new Date()

    // Copia de la fecha actual
    const hace1Mes = new Date()
    hace1Mes.setMonth(hoy.getMonth() - 1)

    // Normalizamos horas para evitar problemas de timezone
    hace1Mes.setHours(0, 0, 0, 0)
    hoy.setHours(23, 59, 59, 999)

    return {
      desde: hace1Mes.toISOString(),
      hasta: hoy.toISOString(),
    }
  },
  rangoMesActual(): RangoFecha {
    const hoy = new Date()

    // Primer día del mes actual
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)

    // Normalizamos horas
    inicioMes.setHours(0, 0, 0, 0)
    hoy.setHours(23, 59, 59, 999)

    return {
      desde: inicioMes.toISOString(),
      hasta: hoy.toISOString(),
    }
  },
  fechaEnString(fecha : Date, inicio: boolean): string {
    if (inicio) {
      fecha.setHours(0, 0, 0, 0)

      return fecha.toISOString()
    }

      fecha.setHours(23, 59, 59, 999)

      return fecha.toISOString()
    
  },
  RangoHoyfechaEnString() {
    const hoyInicio = new Date();
    const hoyFin = new Date();
    
    hoyInicio.setHours(0, 0, 0, 0);
    hoyFin.setHours(23, 59, 59, 999);

    return {
      desde: hoyInicio.toISOString(),
      hasta: hoyFin.toISOString()
    }
    
  }

}
