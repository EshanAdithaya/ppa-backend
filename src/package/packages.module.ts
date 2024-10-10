import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymPackage } from './package.entity';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GymPackage])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackagesModule {}
