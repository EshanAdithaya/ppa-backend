import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PackageService } from './package.service';
import { CreatePackageDto } from './create-package.dto';
import { UpdatePackageDto } from './update-package.dto';
import { GymPackage } from './package.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('packages')
@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new package' })
  @ApiResponse({ status: 201, description: 'The package has been successfully created.', type: GymPackage })
  create(@Body() createPackageDto: CreatePackageDto): Promise<GymPackage> {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all packages' })
  @ApiResponse({ status: 200, description: 'All packages retrieved successfully.', type: [GymPackage] })
  getAllPackages(): Promise<GymPackage[]> {
    return this.packageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a package by ID' })
  @ApiResponse({ status: 200, description: 'Package retrieved successfully.', type: GymPackage })
  getPackageById(@Param('id') id: number): Promise<GymPackage> {
    return this.packageService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a package' })
  @ApiResponse({ status: 200, description: 'The package has been successfully updated.', type: GymPackage })
  updatePackage(@Param('id') id: number, @Body() updatePackageDto: UpdatePackageDto): Promise<GymPackage> {
    return this.packageService.update(id, updatePackageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a package' })
  @ApiResponse({ status: 200, description: 'The package has been successfully deleted.' })
  deletePackage(@Param('id') id: number): Promise<void> {
    return this.packageService.remove(id);
  }
}
