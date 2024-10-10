import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GymPackage } from './package.entity';
import { CreatePackageDto } from './create-package.dto';
import { UpdatePackageDto } from './update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(GymPackage)
    private packageRepository: Repository<GymPackage>,
  ) {}

  create(createPackageDto: CreatePackageDto): Promise<GymPackage> {
    const gymPackage = this.packageRepository.create(createPackageDto);
    return this.packageRepository.save(gymPackage);
  }

  findAll(): Promise<GymPackage[]> {
    return this.packageRepository.find();
  }

  async findOneById(id: number): Promise<GymPackage> {
    const gymPackage = await this.packageRepository.findOne({ where: { Pack_id: id } });
    if (!gymPackage) {
      throw new NotFoundException(`Package with ID ${id} not found.`);
    }
    return gymPackage;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto): Promise<GymPackage> {
    const gymPackage = await this.findOneById(id);
    Object.assign(gymPackage, updatePackageDto);
    return this.packageRepository.save(gymPackage);
  }

  async remove(id: number): Promise<void> {
    const gymPackage = await this.findOneById(id);
    await this.packageRepository.remove(gymPackage);
  }
}
