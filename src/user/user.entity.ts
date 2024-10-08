import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the user' })
  @PrimaryGeneratedColumn()
  UserID: number;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column()
  FirstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Column()
  LastName: string;

  @ApiProperty({ example: '123456789', description: 'The NIC number of the user' })
  @Column({ unique: true })
  NICNumber: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @Column()
  Email: string;

  @ApiProperty({ example: '1234567890', description: 'The telephone number of the user' })
  @Column({ nullable: true })
  TelephoneNo: string;

  @ApiProperty({ example: 'hashedpassword', description: 'The hashed password of the user' })
  @Column()
  Password: string;

  @ApiProperty({ example: 'admin', description: 'The role of the user' })
  @Column()
  Role: string;

  @ApiProperty({ example: 'Active', description: 'The account status of the user' })
  @Column({ default: 'Active' })
  accountStatus: string;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The timestamp of when the user was created' })
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty({ example: '2024-09-17T14:45:00Z', description: 'The timestamp of the latest access time' })
  @Column({ type: 'datetime', nullable: true })
  LatestAccessTime: Date;

  @ApiProperty({ example: 'Bearer xyz123', description: 'The latest issued bearer token' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  LatestIssuedBearerToken: string;
}
