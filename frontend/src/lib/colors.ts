const colorList = ['white', 'color']
export type ButtonColor = typeof colorList[number]

export const buttonColor = (color: ButtonColor) => {
  switch (color) {
    case 'white':
      return ' bg-white hover:bg-sky-400 disabled:bg-gray-100 focus:ring-sky-200 text-sky-400 hover:text-white disabled:text-sky-200 border-2 border-sky-400 disabled:border-sky-200 duration-150'
    default:
      return ' bg-sky-400 hover:bg-sky-500 disabled:bg-sky-200 focus:ring-sky-400 text-white border-2 border-sky-400 hover:border-sky-500 disabled:border-sky-200 duration-150'
  }
}

export const backGroundColors = ['bg-yellow-300', 'bg-orange-400', 'bg-red-400', 'bg-blue-400', 'bg-sky-400']
