// Simulates API responses with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user database (in-memory)
const mockUsers: Array<{
  id: string
  username: string
  name: string
  email: string
  dateOfBirth: string
  password: string
  createdAt: string
}> = []

// Mock tokens storage (simulates sessions)
const mockSessions: Map<
  string,
  {
    userId: string
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
> = new Map()

export const mockAuthAPI = {
  // Signup endpoint
  async signup(data: {
    username: string
    name: string
    email: string
    dateOfBirth: string
    password: string
  }) {
    await delay(500)

    // Check if user already exists
    const existingUser = mockUsers.find(
      u => u.email === data.email || u.username === data.username
    )

    if (existingUser) {
      throw new Error(
        existingUser.email === data.email
          ? 'Email already registered'
          : 'Username already taken'
      )
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    console.log('📝 User created:', {
      email: newUser.email,
      username: newUser.username,
    })
    console.log('📊 Total users:', mockUsers.length)

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
      },
    }
  },

  // Login endpoint
  async login(credentials: { email: string; password: string }) {
    await delay(500)

    console.log('🔍 Login attempt for:', credentials.email)
    console.log(
      '📊 Available users:',
      mockUsers.map(u => ({
        email: u.email,
        password: u.password,
      }))
    )

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    )

    if (!user) {
      console.log('❌ Login failed - user not found or password mismatch')
      throw new Error('Invalid email or password')
    }

    console.log('✅ User found:', user.email)

    // Generate mock tokens
    const accessToken = `mock_access_${crypto.randomUUID()}`
    const refreshToken = `mock_refresh_${crypto.randomUUID()}`
    const expiresIn = 15 * 60 * 1000 // 15 minutes

    // Store session
    mockSessions.set(accessToken, {
      userId: user.id,
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn,
    })

    console.log('🎫 Tokens generated:', {
      accessToken: accessToken.substring(0, 20) + '...',
    })

    return {
      success: true,
      accessToken,
      refreshToken,
      expiresIn,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    }
  },

  // Refresh token endpoint
  async refreshToken(refreshToken: string) {
    await delay(300)

    const session = Array.from(mockSessions.values()).find(
      s => s.refreshToken === refreshToken
    )

    if (!session) {
      throw new Error('Invalid refresh token')
    }

    // Generate new tokens
    const newAccessToken = `mock_access_${crypto.randomUUID()}`
    const newRefreshToken = `mock_refresh_${crypto.randomUUID()}`
    const expiresIn = 15 * 60 * 1000

    // Remove old session
    mockSessions.delete(session.accessToken)

    // Create new session
    mockSessions.set(newAccessToken, {
      userId: session.userId,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresAt: Date.now() + expiresIn,
    })

    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    }
  },

  // Verify token
  async verifyToken(accessToken: string) {
    await delay(100)

    const session = mockSessions.get(accessToken)

    if (!session || session.expiresAt < Date.now()) {
      throw new Error('Invalid or expired token')
    }

    const user = mockUsers.find(u => u.id === session.userId)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    }
  },

  // Logout
  async logout(accessToken: string) {
    await delay(200)
    mockSessions.delete(accessToken)
    return { success: true }
  },

  _debug: {
    getAllUsers: () => mockUsers,
    getAllSessions: () => Array.from(mockSessions.entries()),
  },
}
