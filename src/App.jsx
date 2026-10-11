import { useMemo, useState } from 'react';
import { Search, ShoppingBag, Clock3, MapPin, Leaf, Utensils, ChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

const menuItems = [
  { id: 1, name: 'Chicken Rice Bowl', category: 'Meals', price: 850, time: '15–20 min', emoji: '🍛', description: 'Seasoned rice with grilled chicken and fresh salad', tag: 'Popular' },
  { id: 2, name: 'Veggie Kottu', category: 'Meals', price: 650, time: '10–15 min', emoji: '🥘', description: 'Sri Lankan-style chopped roti with vegetables', tag: 'Vegetarian' },
  { id: 3, name: 'Cheese Sandwich', category: 'Snacks', price: 450, time: '5–10 min', emoji: '🥪', description: 'Toasted sandwich with cheese and garden greens', tag: 'Quick bite' },
  { id: 4, name: 'Fresh Fruit Cup', category: 'Healthy', price: 350, time: '5 min', emoji: '🍉', description: 'A refreshing mix of seasonal fruits', tag: 'Fresh' },
  { id: 5, name: 'Iced Milo', category: 'Drinks', price: 300, time: '3–5 min', emoji: '🥤', description: 'Chilled chocolate malt drink', tag: 'Student favourite' },
  { id: 6, name: 'Pancake Stack', category: 'Snacks', price: 500, time: '10 min', emoji: '🥞', description: 'Fluffy pancakes served with sweet syrup', tag: 'Sweet treat' },
];

const categories = ['All', 'Meals', 'Snacks', 'Healthy', 'Drinks'];
const money = (value) => `Rs. ${value.toLocaleString('en-LK')}`;

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [basket, setBasket] = useState([]);

  const visibleItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [search, category]);

  const addToBasket = (item) => setBasket((current) => [...current, item]);
  const basketTotal = basket.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="CampusEats home">
          <span className="brand-mark"><Utensils size={21} /></span>
          <span>Campus<span className="brand-accent">Eats</span></span>
        </a>
        <div className="topbar-right">
          <span className="campus-label"><MapPin size={15} /> Your campus, your food</span>
          <button className="basket-button" type="button" onClick={() => document.getElementById('basket-summary')?.scrollIntoView({ behavior: 'smooth' })}>
            <ShoppingBag size={18} /> <span>Basket</span><b>{basket.length}</b>
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> GOOD FOOD. GOOD STUDY DAYS.</span>
            <h1>Your campus cravings,<br /><span>sorted.</span></h1>
            <p>Find your next favourite bite. Simple, tasty food for busy student days.</p>
            <a className="hero-link" href="#menu">Explore the menu <ChevronRight size={17} /></a>
          </div>
          <div className="hero-art" aria-label="Illustration of a meal bowl" role="img">
            <div className="art-sun" />
            <div className="art-leaf leaf-one">✦</div>
            <div className="food-bowl"><span>🥗</span></div>
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">✦</div>
            <div className="hero-sticker"><Leaf size={15} /> Fresh picks daily</div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="section-kicker">MADE FOR STUDENT LIFE</span>
              <h2>Today's menu</h2>
              <p>Good food, without the long search.</p>
            </div>
            <div className="search-box"><Search size={18} /><input aria-label="Search food" placeholder="Search the menu..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
          </div>

          <div className="category-list" aria-label="Filter menu by category">
            {categories.map((item) => <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} type="button">{item}</button>)}
          </div>

          <div className="menu-grid">
            {visibleItems.map((item) => (
              <article className="food-card" key={item.id}>
                <div className={`food-art food-art-${item.id}`}><span className="food-tag">{item.tag}</span><span className="food-emoji" role="img" aria-label={item.name}>{item.emoji}</span></div>
                <div className="food-content">
                  <div className="food-title-row"><h3>{item.name}</h3><span className="food-price">{money(item.price)}</span></div>
                  <p className="food-description">{item.description}</p>
                  <div className="food-card-bottom"><span className="prep-time"><Clock3 size={14} /> {item.time}</span><button className="add-button" type="button" onClick={() => addToBasket(item)} aria-label={`Add ${item.name} to basket`}>+</button></div>
                </div>
              </article>
            ))}
          </div>
          {visibleItems.length === 0 && <div className="empty-state"><span>🔎</span><h3>No menu items found</h3><p>Try another search or category.</p></div>}
        </section>

        <section className="basket-summary" id="basket-summary">
          <div><span className="section-kicker">YOUR ORDER</span><h2>Basket summary</h2><p>{basket.length === 0 ? 'Your basket is empty. Add something tasty from the menu.' : `${basket.length} item${basket.length === 1 ? '' : 's'} added to your basket.`}</p></div>
          <div className="basket-total"><span>Demo total</span><strong>{money(basketTotal)}</strong><button type="button" onClick={() => setBasket([])} disabled={basket.length === 0}>Clear basket</button></div>
        </section>

        <div className="demo-note"><span className="demo-note-icon">i</span><p><strong>Student lab demo:</strong> Menu and basket data are stored in this page only. {API_URL ? 'An API URL is configured for the next integration step.' : 'The backend API is not connected yet; VITE_API_URL will be configured during deployment.'}</p></div>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Utensils size={17} /></span><span>Campus<span className="brand-accent">Eats</span></span></a><span>Made for campus life · SE3090 Lab 11</span></footer>
    </div>
  );
}
