import React, { useState } from 'react';
import { Pie, Doughnut, Line } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { MdClose } from 'react-icons/md';
import './chart.css';

// Register Chart.js components
Chart.register(ArcElement, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

// Function to get initial data for widgets
const getInitialData = () => ({
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ],
});

// Chart options to hide legends
const chartOptions = {
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
};

const Dashboard = () => {
  // Initial categories and widgets
  const [categories, setCategories] = useState({ 'CSPM Executive Dashboard': [] });
  const [selectedType, setSelectedType] = useState('Pie');
  const [selectedCategory, setSelectedCategory] = useState('CSPM Executive Dashboard');
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [showWidgetForm, setShowWidgetForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle type selection
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to handle widget name input
  const handleNameChange = (e) => {
    setWidgetName(e.target.value);
  };

  // Function to handle widget text input
  const handleTextChange = (e) => {
    setWidgetText(e.target.value);
  };

  // Function to handle new category name input
  const handleCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to show the widget form modal
  const addWidget = () => {
    setShowWidgetForm(true);
  };

  // Function to submit widget details
  const submitWidget = () => {
    const newWidget = {
      id: Date.now(), // Use current timestamp as unique ID
      type: selectedType,
      data: getInitialData(),
      name: widgetName,
      text: widgetText,
    };

    setCategories(prevCategories => ({
      ...prevCategories,
      [selectedCategory]: [...(prevCategories[selectedCategory] || []), newWidget],
    }));

    // Reset form and hide form fields
    setWidgetName('');
    setWidgetText('');
    setShowWidgetForm(false);
  };

  // Function to hide the widget form modal
  const closeModal = () => {
    setShowWidgetForm(false);
  };

  // Function to remove a widget
  const removeWidget = (category, id) => {
    setCategories(prevCategories => ({
      ...prevCategories,
      [category]: prevCategories[category].filter(widget => widget.id !== id),
    }));
  };

  // Function to add a new category
  const addCategory = () => {
    if (newCategoryName && !categories[newCategoryName]) {
      setCategories(prevCategories => ({
        ...prevCategories,
        [newCategoryName]: [],
      }));
      setNewCategoryName('');
    }
  };

  // Function to remove a category
  const removeCategory = (category) => {
    const updatedCategories = { ...categories };
    delete updatedCategories[category];
    setCategories(updatedCategories);
    setSelectedCategory(Object.keys(updatedCategories)[0] || '');
  };

  // Filter widgets based on search query
  const filteredWidgets = (category) => {
    return categories[category].filter(widget => 
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getChartDataContent = (data) => {
    return data.labels.map((label, index) => (
      <div key={index} className="chart-label">
        <span
          className="color-box"
          style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
        ></span>
        {label}: {data.datasets[0].data[index]}
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div>
        <h3>Select Widget Type</h3>
        <form>
          <label>
            <input
              type="radio"
              value="Pie"
              checked={selectedType === 'Pie'}
              onChange={handleTypeChange}
            />
            Pie
          </label>
          <label>
            <input
              type="radio"
              value="Doughnut"
              checked={selectedType === 'Doughnut'}
              onChange={handleTypeChange}
            />
            Doughnut
          </label>
          <label>
            <input
              type="radio"
              value="Line"
              checked={selectedType === 'Line'}
              onChange={handleTypeChange}
            />
            Line
          </label>
        </form>
        <h3>Select Category</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="button" onClick={addWidget}>Add Widget</button>
      </div>
      <div>
        <h3>Manage Categories</h3>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={handleCategoryNameChange}
        />
        <button type="button" onClick={addCategory}>Add Category</button>
        <select multiple onChange={(e) => setSelectedCategory([...e.target.selectedOptions].map(option => option.value))}>
          {Object.keys(categories).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => removeCategory(selectedCategory)}>Remove Selected Category</button>
      </div>
      <div>
        <h3>Search Widgets</h3>
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {Object.keys(categories).map(category => (
          <div key={category} className="category-container">
            <div className="category-title">
              {category}
              <button className='categoryRemoveBtn' onClick={() => removeCategory(category)}>&times;</button>
            </div>
            <div className="widget-container">
              {filteredWidgets(category).map(widget => (
                <div key={widget.id} className="widget">
                  <h4 className='widget-title'>{widget.name}</h4> {/* Widget name above the chart */}
                  <div className="widget-content">
                    <div className="chart-container">
                      {widget.type === 'Pie' && <Pie data={widget.data} options={chartOptions} />}
                      {widget.type === 'Doughnut' && <Doughnut data={widget.data} options={chartOptions} />}
                      {widget.type === 'Line' && <Line data={widget.data} options={chartOptions} />}
                    </div>
                    <div className="chart-data-content">
                      {getChartDataContent(widget.data)} {/* Labels to the right with color blocks */}
                    </div>
                  </div>
                  <button className="remove-widget" onClick={() => removeWidget(category, widget.id)}>
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showWidgetForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Add Widget</h3>
            <form onSubmit={(e) => { e.preventDefault(); submitWidget(); }}>
              <label>
                Widget Name:
                <input type="text" value={widgetName} onChange={handleNameChange} />
              </label>
              <label>
                Widget Text:
                <input type="text" value={widgetText} onChange={handleTextChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
