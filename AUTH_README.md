# Authentication System

## Overview
This authentication system provides login/signup functionality with client-side session management using localStorage.

## Features
- ✅ User Login
- ✅ User Registration (Signup)
- ✅ Form Validation
- ✅ Protected Routes
- ✅ Session Management
- ✅ Logout Functionality
- ✅ Social Login UI (Google, Facebook)

## Pages

### Login/Signup Page
**Route:** `/auth/login`

Features:
- Toggle between login and signup modes
- Form validation with error messages
- Email, password, name, phone fields
- Social login buttons (UI only)
- Redirects to account page after successful authentication

### Account Page
**Route:** `/account`

Features:
- Protected route (requires authentication)
- Displays user profile information
- Shows order history, addresses, settings
- Logout button
- Redirects to login if not authenticated

### Orders Page
**Route:** `/account/orders`

Features:
- Protected route
- Lists all user orders
- Search and filter functionality
- Redirects to login if not authenticated

### Order Details Page
**Route:** `/account/orders/[orderId]`

Features:
- Protected route
- Shows detailed order information
- Order timeline, tracking info
- Redirects to login if not authenticated

## Authentication Flow

### Login Flow
1. User visits `/account` or any protected page
2. System checks `localStorage.isLoggedIn`
3. If not authenticated → Redirect to `/auth/login`
4. User enters credentials
5. On successful login:
   - User data stored in `localStorage.user`
   - `localStorage.isLoggedIn` set to `"true"`
   - Redirect to `/account`

### Signup Flow
1. User clicks "Sign Up" on login page
2. Form toggles to signup mode
3. User enters name, email, phone, password
4. On successful registration:
   - User data stored in `localStorage.user`
   - `localStorage.isLoggedIn` set to `"true"`
   - Redirect to `/account`

### Logout Flow
1. User clicks "Logout" button in account page
2. `localStorage.user` and `localStorage.isLoggedIn` are removed
3. Redirect to `/auth/login`

## LocalStorage Schema

```typescript
// localStorage.user
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "avatar": "JD"
}

// localStorage.isLoggedIn
"true" | null
```

## Utility Functions

Located in: `/app/utils/auth.ts`

```typescript
isAuthenticated(): boolean
getUser(): User | null
setUser(user: User): void
logout(): void
login(email: string, password: string): Promise<User>
register(name: string, email: string, password: string, phone?: string): Promise<User>
```

## Form Validation

### Login
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Signup
- Name: Required
- Email: Required, valid email format
- Phone: Optional, valid phone format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

## Security Notes

⚠️ **Important:** This is a client-side implementation for demonstration purposes.

For production, you should:
1. Replace localStorage with secure HTTP-only cookies
2. Implement proper backend authentication (JWT, sessions, etc.)
3. Add CSRF protection
4. Use HTTPS only
5. Implement rate limiting
6. Add password strength requirements
7. Add email verification
8. Add password reset functionality
9. Use proper password hashing (bcrypt, argon2, etc.)
10. Implement refresh token rotation

## Styling

All pages use the project's design system:
- Compact padding and margins (p-1 to p-3)
- Small font sizes (text-xs to text-sm)
- Responsive design (mobile-first)
- Consistent color scheme (primary, muted, destructive)
- shadcn/ui components (Card, Button, Input, Label, Badge)

## Next Steps for Production

1. **Backend Integration:**
   - Replace mock functions in `utils/auth.ts`
   - Connect to real authentication API
   - Use environment variables for API endpoints

2. **Security:**
   - Implement proper session management
   - Add token refresh mechanism
   - Add CSRF tokens

3. **Features:**
   - Email verification
   - Password reset
   - Two-factor authentication
   - OAuth integration (Google, Facebook)
   - Remember me functionality

4. **UX Improvements:**
   - Loading states
   - Error handling
   - Success messages
   - Password strength indicator
   - Show/hide password toggle

## Testing

To test the authentication:
1. Visit `http://localhost:3000/account`
2. You'll be redirected to `/auth/login`
3. Fill in the form (any email/password for demo)
4. Click "Sign In" or "Create Account"
5. Wait 1.5 seconds (simulated API call)
6. You'll be redirected to `/account` page
7. Click "Logout" to test logout functionality
