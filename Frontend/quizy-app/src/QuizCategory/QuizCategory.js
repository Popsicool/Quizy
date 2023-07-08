import './QuizCategory.css'

const QuizCategory = () => {
  return (
      <div className="categories-container">
        <header className="section-header">
          <h2 className="section-title">Quiz Categories</h2>
          <p className="section-tagline">Select your prefered category and get started</p>
        </header>
        <div className="section-body">
          <ul className="category-list">
            <ServiceCard title="Mathematics" />
            <ServiceCard title="Coding" />
            <ServiceCard title="Sciences" />
            <ServiceCard title="UX Design" />
            <ServiceCard title="Web Development" />
            <ServiceCard title="Philosophy" />
          </ul>
        </div>
      </div>
  );
};


const ServiceCard = ({ title }) => {
  return (
    <li className="col-1-3">
      <div className="card-services">
        <h3 className="card-title">
          <a href="#">{title}</a>
        </h3>
      </div>
    </li>
  );
};

export default QuizCategory;