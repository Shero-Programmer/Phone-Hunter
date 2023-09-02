const loadPhone = async (searchText = 'iphone') => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  // Step:1 Where you will show the data

  const phoneContainer = document.getElementById('phone-container');

  // Clear container before adding new cards
  phoneContainer.textContent = '';

  // Display show all button if there are more than 12 items
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }

  // Display first 12 phones
  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    // Step:02 Create a DIV
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 shadow-xl p-8`;
    // Step: 03 Set Inner HTML
    phoneCard.innerHTML = `
    <figure>
      <img src="${phone.image}"
        alt="Shoes"/>
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations of passages of available, but the majority have suffered</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;

    // Step: 04 Append Child
    phoneContainer.appendChild(phoneCard);
  });

  // Hide Loading Spinner
  toggleLoadSpinner(false);
};

const handleShowDetails = async (id) => {
  // console.log('Show Details', id);

  // load individual phone data
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};

// Display individual phone data

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById(
    'show-details-container'
  );
  showDetailsContainer.innerHTML = `
    <img src= " ${phone.image}"/>
    <p> Main Features:  ${phone.mainFeatures.storage} </p>
    <p> Display Size:  ${phone.mainFeatures.displaySize} </p>
    <p> Memory:  ${phone.mainFeatures.memory} </p>
    <p> Chip:  ${phone.mainFeatures.chipSet} </p>
    `;
  // Display Modal
  shoeDetailsModal.showModal();
};

// Handle Search Button

const handleSearch = () => {
  toggleLoadSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText);
};

const toggleLoadSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

loadPhone();
