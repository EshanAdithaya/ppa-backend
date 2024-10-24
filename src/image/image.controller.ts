import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
  import { AuthGuard } from '@nestjs/passport';
  import { ImageService } from './image.service';
  import { Image } from './image.entity';
  
  @ApiTags('images')
  @Controller('images')
  export class ImageController {
    constructor(private readonly imageService: ImageService) {}
  
    @Post('upload')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload a new image' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Image uploaded successfully.', type: Image })
    @UseInterceptors(
      FileInterceptor('file', {
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB limit
        },
        fileFilter: (req, file, callback) => {
          if (!file.mimetype.match(/^image\/(jpeg|png|gif|jpg)$/)) {
            callback(new BadRequestException('Only image files are allowed'), false);
          }
          callback(null, true);
        },
      }),
    )
    async upload(@UploadedFile() file: Express.Multer.File): Promise<Image> {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      return this.imageService.upload(file);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all images' })
    @ApiResponse({ status: 200, description: 'Return all images.', type: [Image] })
    findAll(): Promise<Image[]> {
      return this.imageService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get image by id' })
    @ApiResponse({ status: 200, description: 'Return the image.', type: Image })
    findOne(@Param('id') id: string): Promise<Image> {
      return this.imageService.findOne(+id);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete image' })
    @ApiResponse({ status: 200, description: 'Image deleted successfully.' })
    remove(@Param('id') id: string): Promise<void> {
      return this.imageService.remove(+id);
    }
  }