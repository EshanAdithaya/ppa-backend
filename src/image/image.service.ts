// image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { FirebaseService } from './firebase.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private firebaseService: FirebaseService,
  ) {}

  async upload(file: Express.Multer.File): Promise<Image> {
    const { url, path } = await this.firebaseService.uploadFile(file);
    
    const image = this.imageRepository.create({
      filename: file.originalname,
      url,
      path,
    });

    return this.imageRepository.save(image);
  }

  findAll(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async remove(id: number): Promise<void> {
    const image = await this.findOne(id);
    await this.firebaseService.deleteFile(image.path);
    await this.imageRepository.remove(image);
  }
}