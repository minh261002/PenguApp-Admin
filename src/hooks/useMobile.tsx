import React from 'react'

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth <= breakpoint)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isMobile
}

export default useMobile
