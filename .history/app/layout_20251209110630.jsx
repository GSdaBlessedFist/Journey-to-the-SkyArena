import '@/global.css'
import ClientProviders from '../src/providers/ClientProviders'
import { InstructionProvider } from '../src/providers/InstructionProvider'

export const metadata = {
  title: 'Journey to the SkyArena',
  description: 'Portfolio for Interactive 3D dev',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <body>
        <ClientProviders>
          <InstructionProvider>
            {children}
          </InstructionProvider>
        </ClientProviders>
        <div id='overlay-root' />
        <div id='pip_layer-root' />
      </body>
    </html>
  )
}
