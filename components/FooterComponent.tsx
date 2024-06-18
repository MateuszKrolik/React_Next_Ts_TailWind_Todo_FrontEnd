// '@/components/FooterComponent.tsx'

import logo from '@/public/logo.svg';
import Image from 'next/image';

export default function FooterComponent() {
  return (
    <footer className="footer footer-center p-3 bg-primary text-primary-content sticky bottom-0">
      <aside>
        <Image src={logo} alt="Logo" width={50} height={50} priority />
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
    </footer>
  );
}
