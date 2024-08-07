import {
  createClient,
} from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb2h3a3FldnZmaW9nZmJjY3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5OTU1NzgsImV4cCI6MjAzMTU3MTU3OH0.FfU3_Ooa7JA8g8G8Z0D0JJ0Hqmpq2GtODWnw8cvFs5A'
const supabaseUrl = 'https://lmohwkqevvfiogfbcczr.supabase.co'

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey)

if (!supabase) {
  console.error('Supabase client failed to initialize')
}

window.supabase = supabase;

// Wait for the DOM content to load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Function to insert a new review into the database
    async function insertRow(row) {
        try {
            const { data, error } = await supabase            .from('whisky_reviews')
            .insert([{
                'distillery': row.distillery,
                'bottle_name': row.bottle_name, 
                'colour': row.colour,
                'nose': row.nose,
                'palate': row.palate,
                'finish': row.finish,
                'final': row.final,
                'score': row.score
            }]);

            if (error) {
                console.error('Error adding row:', error.message);
            } else {
                console.log('Item inserted:', data);
                // Reload reviews after successful insertion (optional)
                getReviews();
            }
        } catch (error) {
            console.error('Error adding row:', error.message);
        }
    }

    // Function to fetch all reviews from the database
    async function getReviews() {
        try {
            const { data, error } = await supabase
                .from('whisky_reviews')
                .select('*');

            if (error) {
                console.error('Error fetching reviews:', error.message);
            } else {
                console.log('Reviews fetched:', data);
                const formattedData = data.map(review => ({
                    ...review,
                    distillery: capitalizeSentences(review.distillery),
                    bottle_name: capitalizeSentences(review.bottle_name),
                    colour: capitalizeSentences(review.colour),
                    nose: capitalizeSentences(review.nose),
                    palate: capitalizeSentences(review.palate),
                    finish: capitalizeSentences(review.finish),
                    final: capitalizeSentences(review.final)
                }));
                displayReviews(formattedData); // Display fetched reviews on the webpage
            }
        } catch (error) {
            console.error('Error fetching reviews:', error.message);
        }
    }

    // Function to display reviews on the webpage
    function displayReviews(reviews) {
        const reviewSection = document.getElementById('review-section');
        reviewSection.innerHTML = ''; // Clear previous content

        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');

            const title = document.createElement('h3');
            title.textContent = `${review['distillery']} - ${review['bottle_name']}`;
            reviewDiv.appendChild(title);

            const details = document.createElement('p');
            details.innerHTML = `<b>Colour:</b> ${review['colour']}<br>` +
                                `<b>Nose:</b> ${review['nose']}<br>` +
                                `<b>Palate:</b> ${review['palate']}<br>` +
                                `<b>Finish:</b> ${review['finish']}<br>` +
                                `<b>Final:</b> ${review['final']}<br>` +
                                `<b>Score:</b> ${review['score']}/10`;
            reviewDiv.appendChild(details);

            reviewSection.appendChild(reviewDiv);
        });
    }

    function capitalizeSentences(text) {
        if (!text) return '';
        return text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, char => char.toUpperCase());
    }

    // Event listener for the review form submission
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Extract form data
        const formData = new FormData(reviewForm);
        const row = {};
        formData.forEach((value, key) => {
            row[key] = value;
            console.log(`Key: ${key}`)
            console.log(`Value: ${value}`)
        });

        // Insert the review into the database
        await insertRow(row);

        // Clear form fields after submission (optional)
        reviewForm.reset();
    });

    // Fetch and display reviews when the page loads
    getReviews();
});
