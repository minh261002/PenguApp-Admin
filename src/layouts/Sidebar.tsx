import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Link } from 'react-router-dom'
import { sidebarItems } from '@/constants/sidebarItems'
import { useLocation } from 'react-router-dom'
import { LayoutDashboardIcon } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  return (
    <div className={`hidden md:block w-[290px] min-w-[290px] bg-white border-r-2`}>
      <div className='flex flex-col justify-center h-[64px]'>
        <div className='px-6 w-auto'>
          <img className='max-h-10' src='\logo.svg' alt='Ecme logo' />
        </div>
      </div>

      <div className='flex flex-col'>
        <Accordion type='single' collapsible defaultValue={path}>
          <AccordionItem
            value='Dashboard'
            className={`px-4 dashboard ${path === '' ? 'text-blue-500  font-semibold' : ''}`}
          >
            <AccordionTrigger className='flex items-center justify-between gap-2 hover:no-underline'>
              <Link to={'/'} className='flex items-center justify-start gap-2 '>
                <LayoutDashboardIcon size={24} className='dashboard-icon' />
                Dashboard
              </Link>
            </AccordionTrigger>
          </AccordionItem>

          {sidebarItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={item.href.split('/')[1]}
              className={`px-4 ${path === item.href.split('/')[1] ? 'font-semibold' : ''}`}
            >
              <AccordionTrigger className='flex items-center justify-between gap-2 hover:no-underline'>
                <div className='flex items-center justify-start gap-2'>
                  {item.icon}
                  {item.title}
                </div>
              </AccordionTrigger>

              {item.children.length > 0 && (
                <AccordionContent>
                  <div className='flex flex-col ml-4'>
                    {item.children.map((child, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between gap-2 py-3 rounded-md ${
                          location.pathname === child.href ? 'pl-4  text-blue-500 ' : ''
                        }`}
                      >
                        <Link to={child.href} className='flex items-center justify-start gap-2'>
                          {child.icon}
                          {child.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Sidebar
