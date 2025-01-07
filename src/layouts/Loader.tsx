const Loader = () => {
  return (
    <div className='w-full h-1/2 flex items-center justify-center'>
      <div className='relative w-[44.8px] h-[44.8px] text-primary'>
        <div
          className='absolute inset-0 rounded-full'
          style={{
            background: `
                  radial-gradient(10.08px at bottom right, transparent 94%, currentColor) top left,
                  radial-gradient(10.08px at bottom left, transparent 94%, currentColor) top right,
                  radial-gradient(10.08px at top right, transparent 94%, currentColor) bottom left,
                  radial-gradient(10.08px at top left, transparent 94%, currentColor) bottom right
              `,
            backgroundSize: '22.4px 22.4px',
            backgroundRepeat: 'no-repeat',
            animation: 'shapes-77ngqcmd 1.5s infinite cubic-bezier(0.3,1,0,1)'
          }}
        ></div>
        <style>
          {`
          @keyframes shapes-77ngqcmd {
            33% {
              inset: -11.2px;
              transform: rotate(0deg);
            }
            66% {
              inset: -11.2px;
              transform: rotate(90deg);
            }
            100% {
              inset: 0;
              transform: rotate(90deg);
            }
          }
        `}
        </style>
      </div>
    </div>
  )
}

export default Loader
