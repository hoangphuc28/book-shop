import { Test, TestingModule } from '@nestjs/testing';
import { AboutService } from './about.service';
import { AboutPage } from '../../common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AboutService', () => {
  let service: AboutService;
  let repository: Repository<AboutPage>;

  const aboutPage = new AboutPage({ name: 'about', content: '<h1>Hello!</h1>' });

  const mockRepository = {
    findOne: jest.fn().mockResolvedValue(aboutPage),
    save: jest.fn().mockResolvedValue(aboutPage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutService,
        {
          provide: getRepositoryToken(AboutPage),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AboutService>(AboutService);
    repository = module.get<Repository<AboutPage>>(getRepositoryToken(AboutPage));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveContent', () => {
    it('should throw an error if about page does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.saveContent('<h1>Updated Content</h1>')).rejects.toThrow('Can not find any about page');
    });

    it('should update the content of the about page', async () => {
      const newContent = '<h1>Updated Content</h1>';
      await service.saveContent(newContent);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: 'about' } });
      expect(aboutPage.content).toBe(newContent);
      expect(mockRepository.save).toHaveBeenCalledWith(aboutPage);
    });
  });

  describe('getAboutPage', () => {
    it('should return the about page', async () => {
      const result = await service.getAboutPage();
      expect(result).toBe(aboutPage);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { name: 'about' } });
    });
  });
});
