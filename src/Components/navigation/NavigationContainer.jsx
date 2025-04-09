import '../../styles/NavigationContainer.css';
import Logo from './Logo.jsx';
export default function NavigationContainer() {
  return (
    <nav>
      <a href="/">
        <div className="logo">
          <Logo />
        </div>
      </a>
    </nav>
  );
}
