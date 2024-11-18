let currentStep = 1;
let selectedSeats = [];
let totalPrice = 0;

const seatPrices = {
    vip: 50,
    balcony: 30,
    regular: 20
};

// Predefined occupied seats
const occupiedSeats = ['Seat 5', 'Seat 12', 'Seat 17'];

function nextStep() {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step${currentStep}`).style.display = 'block';

    if (currentStep === 3) {
        displayReviewDetails();
    }
}

function prevStep() {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

function resetForm() {
    document.getElementById('bookingForm').reset();
    currentStep = 1;
    selectedSeats = [];
    totalPrice = 0;
    document.getElementById('confirmationMessage').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function generateSeatMap() {
    const seatMap = document.getElementById('seatMap');
    seatMap.innerHTML = '';
    const rows = 5;
    const columns = 5;

    for (let i = 0; i < rows * columns; i++) {
        const seat = document.createElement('button');
        seat.classList.add('seat');

        // Assign categories (VIP, Balcony, Regular)
        if (i < 5) {
            seat.classList.add('vip');
            seat.dataset.category = 'vip';
        } else if (i < 15) {
            seat.classList.add('balcony');
            seat.dataset.category = 'balcony';
        } else {
            seat.classList.add('regular');
            seat.dataset.category = 'regular';
        }

        seat.textContent = `Seat ${i + 1}`;
        seat.dataset.seat = `Seat ${i + 1}`;

        // Mark occupied seats
        if (occupiedSeats.includes(seat.dataset.seat)) {
            seat.classList.add('occupied');
            seat.disabled = true;
        }

        // Toggle seat selection
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            const seatNumber = seat.dataset.seat;
            const seatCategory = seat.dataset.category;

            if (selectedSeats.includes(seatNumber)) {
                selectedSeats = selectedSeats.filter(s => s !== seatNumber);
                totalPrice -= seatPrices[seatCategory];
            } else {
                selectedSeats.push(seatNumber);
                totalPrice += seatPrices[seatCategory];
            }

            updateSelectedSeatsDisplay();
        });

        seatMap.appendChild(seat);
    }
}

function updateSelectedSeatsDisplay() {
    document.getElementById('selectedSeats').textContent = `Selected Seats: ${selectedSeats.join(', ') || 'None'}`;
    document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice}`;
}

function displayReviewDetails() {
    const play = document.getElementById('play').value;
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const seats = selectedSeats.join(', ');

    alert(`Review Your Booking:\nPlay: ${play}\nDate: ${date}\nName: ${name}\nEmail: ${email}\nSeats: ${seats}\nTotal Price: $${totalPrice}`);
}

// Initialize the seat map on page load
window.onload = generateSeatMap;
