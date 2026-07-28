import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class IdentityService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private generateToken(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    return this.jwtService.sign(payload);
  }

  async register(body: any) {
    const { username, email, password, role } = body;

    if (!username || !email || !password) {
      throw new BadRequestException('Username, email, and password are required fields.');
    }

    if (username.trim().length < 3) {
      throw new BadRequestException('Username must be at least 3 characters long.');
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long.');
    }

    const targetRole = role ? role.toLowerCase() : 'customer';
    if (!['customer', 'vendor', 'admin'].includes(targetRole)) {
      throw new BadRequestException('Invalid role. Role must be customer, vendor, or admin.');
    }

    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username: username.trim() }
    });

    if (existingUserByUsername) {
      throw new BadRequestException('Username is already taken. Please choose a unique username.');
    }

    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (existingUserByEmail) {
      throw new BadRequestException('Email is already registered.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: targetRole
      }
    });

    const token = this.generateToken(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'User registered successfully!',
      token,
      user: userWithoutPassword
    };
  }

  async login(body: any) {
    const { username, email, password } = body;
    const loginIdentifier = username || email;

    if (!loginIdentifier || !password) {
      throw new BadRequestException('Username/Email and password are required.');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: loginIdentifier.trim() },
          { email: loginIdentifier.trim().toLowerCase() }
        ]
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials. User does not exist.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials. Incorrect password.');
    }

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful!',
      token,
      user: userWithoutPassword
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookings: {
          include: {
            event: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User profile not found.');
    }

    const { password: _, ...userProfile } = user;

    return {
      success: true,
      data: userProfile
    };
  }
}
