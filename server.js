const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { supabase } = require('./supabaseClient'); // Import Supabase client

// Basic route
app.get('/', (req, res) => {
  res.send('Typing Speed Academy Backend is running!');
});

// Login Route with Supabase
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email }); // Avoid logging password

  if (!email || !password) {
    return res.status(400).json({ error: { type: 'validation_error', message: 'Email and password are required' } });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Supabase login error:', error.message, 'Status:', error.status);
      // Default to 401 for login failures
      let statusCode = 401;
      let errorMessage = 'Invalid login credentials. Please check your email and password.';
      
      // You can check error.status or error.message for more specific cases if needed
      // For example, if Supabase distinguishes between user not found and wrong password in the future.
      // if (error.message.includes('User not found')) { ... }

      return res.status(statusCode).json({ error: { type: 'auth_error', message: errorMessage, details: error.message } });
    }

    res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    });

  } catch (err) {
    console.error('Server error during login:', err.message);
    res.status(500).json({ error: { type: 'server_error', message: 'Internal server error during login.' } });
  }
});

// Signup Route with Supabase
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup attempt:', { name, email }); // Avoid logging password

  if (!name || !email || !password) {
    return res.status(400).json({ error: { type: 'validation_error', message: 'Name, email, and password are required.' } });
  }
  // Basic password length validation (Supabase enforces 6 characters by default)
  if (password.length < 6) {
    return res.status(400).json({ error: { type: 'validation_error', message: 'Password should be at least 6 characters long.' } });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name, // This will be available in new.raw_user_meta_data->>'full_name'
          username: name,  // Using name as username for simplicity. Ensure it's unique if needed.
                           // The trigger uses raw_user_meta_data->>'username'
        }
      }
    });

    if (error) {
      console.error('Supabase signup error:', error.message, 'Status:', error.status);
      let statusCode = 400; // Default bad request
      let clientMessage = 'Signup failed. Please try again.';

      if (error.message.toLowerCase().includes('user already registered')) {
        statusCode = 409; // Conflict
        clientMessage = 'This email is already registered. Please try logging in.';
      } else if (error.message.toLowerCase().includes('password should be at least 6 characters')) {
        // This case is already handled by our own validation, but good to have as a fallback
        statusCode = 400;
        clientMessage = 'Password should be at least 6 characters long.';
      } else if (error.status === 422) { // Unprocessable Entity - often validation errors from Supabase
        statusCode = 422;
        clientMessage = error.message; // Use Supabase's message directly for 422 if it's user-friendly
      }
      // Add more specific error checks as needed based on Supabase responses

      return res.status(statusCode).json({ error: { type: 'auth_error', message: clientMessage, details: error.message } });
    }

    let responseMessage = 'Signup successful.';
    // Check if email confirmation is pending
    if (data.user && data.user.identities && data.user.identities.length > 0 && !data.session) {
      responseMessage = 'Signup successful! Please check your email to confirm your account.';
    }

    res.status(201).json({
      message: responseMessage,
      user: data.user
      // session: data.session // Only send session if it exists (i.e., email confirmation not strictly required or auto-confirmed)
    });

  } catch (err) {
    console.error('Server error during signup:', err.message);
    res.status(500).json({ error: { type: 'server_error', message: 'Internal server error during signup.' } });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});