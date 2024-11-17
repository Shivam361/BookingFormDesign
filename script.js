let currentStep = 1;
let selectedSeats = [];

// Function to navigate to the next step
function nextStep() {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step${currentStep}`).style.display = 'block';

    if (currentStep === 3) {
        displayReviewDetails();
    }
}

// Function to navigate to the previous step
function prevStep() {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

// Function to reset the form
function resetForm() {
    document.getElementById('bookingForm').reset();
    currentStep = 1;
    selectedSeats = [];
    document.getElementById('confirmationMessage').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

// Generate the interactive seat map
function generateSeatMap() {
    const seatMap = document.getElementById('seatMap');
    seatMap.innerHTML = '';
    const rows = 5;
    const columns = 5;

    for (let i = 0; i < rows * columns; i++) {
        const seat = document.createElement('button');
        seat.classList.add('seat');
        seat.textContent = `Seat ${i + 1}`;
        seat.dataset.seat = `Seat ${i + 1}`;

        // Toggle seat selection on click
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
                const seatNumber = seat.dataset.seat;

                if (selectedSeats.includes(seatNumber)) {
                    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
                } else {
                    selectedSeats.push(seatNumber);
                }

                updateSelectedSeatsDisplay();
            }
        });

        seatMap.appendChild(seat);
    }
}

// Update the display of selected seats
function updateSelectedSeatsDisplay() {
    const selectedSeatsDisplay = document.getElementById('selectedSeats');
    selectedSeatsDisplay.textContent = `Selected Seats: ${selectedSeats.join(', ') || 'None'}`;
}

// Display booking review details
function displayReviewDetails() {
    const play = document.getElementById('play').value;
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const seats = selectedSeats.join(', ');

    alert(`Review Your Booking:\nPlay: ${play}\nDate: ${date}\nName: ${name}\nEmail: ${email}\nSeats: ${seats}`);
}

// Initialize the seat map on page load
window.onload = generateSeatMap;
