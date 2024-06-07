import { Injectable } from '@nestjs/common';
import { AboutPage } from '../../common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutPage)
    private aboutPageRepository: Repository<AboutPage>,
  ) {
    // const aboutPage = new AboutPage({name: 'about', content: `<h1>Hello!</h1>`})
    // this.aboutPageRepository.save(aboutPage)
  }
  async saveContent(content: string) {
    const aboutPage = await this.aboutPageRepository.findOne({where: {name: 'about'}})
    if(!aboutPage)
      throw new Error('Can not find any about page')
    aboutPage.content = content
      this.aboutPageRepository.save(aboutPage)
  }
  async getAboutPage() {
    return this.aboutPageRepository.findOne({where: {name: 'about'}})
  }
}
