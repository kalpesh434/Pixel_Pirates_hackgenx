
        // Wait for page to load
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(function() {
                    document.getElementById('loader').classList.add('hidden');
                    document.getElementById('login-page').style.opacity = '1';
                }, 500);
            }, 1500);
            
            // Generate random CAPTCHA codes
            generateCaptcha('mobile-captcha-code');
            generateCaptcha('email-captcha-code');
        });
        
        // Generate random CAPTCHA
        function generateCaptcha(elementId) {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
            let captcha = '';
            for (let i = 0; i < 6; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            document.getElementById(elementId).textContent = captcha;
        }

        // Select user type (public or government)
        function selectUserType(type) {
            document.querySelectorAll('.user-type-card').forEach(card => {
                card.classList.remove('active');
            });
            
            document.querySelector(`.user-type-card:nth-child(${type === 'public' ? '1' : '2'})`).classList.add('active');
        }

        // Switch between mobile and email login tabs
        function switchLoginTab(tab) {
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelector(`.tab:nth-child(${tab === 'mobile' ? '1' : '2'})`).classList.add('active');
            
            if (tab === 'mobile') {
                document.getElementById('mobile-login').classList.remove('hidden');
                document.getElementById('email-login').classList.add('hidden');
            } else {
                document.getElementById('mobile-login').classList.add('hidden');
                document.getElementById('email-login').classList.remove('hidden');
            }
        }

        // Show signup form
        function showSignupForm() {
            document.querySelector('.login-container').classList.add('hidden');
            document.getElementById('signup-form').classList.remove('hidden');
        }

        // Back to login function
        function backToLogin() {
            document.getElementById('signup-form').classList.add('hidden');
            document.querySelector('.login-container').classList.remove('hidden');
        }
        
        // Handle Mobile Login
        document.getElementById('mobile-auth-form').addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(e, 'mobile');
        });
        
        // Handle Email Login
        document.getElementById('email-auth-form').addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(e, 'email');
        });
        
        // Handle Register Form
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
            
            const submitBtn = e.target.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
            submitBtn.disabled = true;
            
            // Simulate registration process
            setTimeout(() => {
                alert('Registration successful! You can now login with your credentials.');
                
                // Reset form
                e.target.reset();
                
                // Return to login
                backToLogin();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
        
        // Handle login
        function handleLogin(e, loginType) {
            // Get the user type
            const isPublicUser = document.querySelector('.user-type-card:nth-child(1)').classList.contains('active');
            
            // Validate CAPTCHA
            let captchaInput, captchaValue;
            
            if (loginType === 'mobile') {
                captchaInput = document.getElementById('captcha').value;
                captchaValue = document.getElementById('mobile-captcha-code').textContent;
            } else {
                captchaInput = document.getElementById('email-captcha').value;
                captchaValue = document.getElementById('email-captcha-code').textContent;
            }
            
            if (captchaInput !== captchaValue) {
                alert('Invalid CAPTCHA. Please try again.');
                
                // Generate new CAPTCHA
                generateCaptcha(loginType === 'mobile' ? 'mobile-captcha-code' : 'email-captcha-code');
                return;
            }
            
            // Show loading effect on button
            const submitBtn = e.target.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate login delay
            setTimeout(() => {
                // Add transition effect
                document.getElementById('login-page').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('login-page').classList.add('hidden');
                    
                    // Redirect to appropriate dashboard
                    // This is where you would normally redirect to the correct page
                    // For this standalone example, we'll just show a success message
                    alert(`Login successful! Redirecting to ${isPublicUser ? 'Public' : 'Government'} Dashboard`);
                    
                    // Reset the form and button
                    e.target.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Generate new CAPTCHA for next login attempt
                    generateCaptcha('mobile-captcha-code');
                    generateCaptcha('email-captcha-code');
                    
                    // For demo purposes: reload the page after a short delay
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }, 500);
            }, 1500);
        }
    
