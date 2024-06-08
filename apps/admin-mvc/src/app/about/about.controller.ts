import { AboutService } from '@book-shop/libs';
import { Body, Controller, Get, Post, Render } from '@nestjs/common';

@Controller('about')
export class AboutController {
  constructor(
    private aboutPageService: AboutService
  ) {}
  @Get()
  @Render('about/index')
  async loadAboutForm() {
    const res = await this.aboutPageService.getAboutPage()
    return {content: res.content}
  }
  @Post()
  async saveContent(@Body() body: {content: string}) {
    try {
      await this.aboutPageService.saveContent(body.content);
      return { message: 'Content saved successfully' };
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  }
}
