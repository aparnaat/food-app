import { useContext } from 'react';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function CafeItem({ cafe, onViewMenu }) { 
  const cartCtx = useContext(CartContext);

  function handleViewMenuClick() {
    onViewMenu();
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${cafe.image.src}`} alt={cafe.image.alt} style={{ maxWidth: '500px', margin: '0 auto' }} />
        <div>
          <h3>{cafe.title}</h3>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleViewMenuClick}>View Menu</Button>
        </p>
      </article>
    </li>
  );
}
