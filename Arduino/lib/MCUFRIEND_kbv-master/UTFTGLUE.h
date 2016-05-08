/*
 * utftglue.h
 *
 * Created: 02/03/2013 14:25:06
 *  Author: David Prentice
 */ 


#ifndef UTFTGLUE_H_
#define UTFTGLUE_H_

#define LEFT 0
#define RIGHT 9999
#define CENTER 9998

#define PORTRAIT 0
#define LANDSCAPE 1

#include <MCUFRIEND_kbv.h>

struct _current_font
{
	uint8_t* font;
	uint8_t x_size;
	uint8_t y_size;
	uint8_t offset;
	uint8_t numchars;
};

class UTFTGLUE : public MCUFRIEND_kbv
{
	public:
//	UTFTGLUE() : MCUFRIEND_kbv() {}
	UTFTGLUE(byte model, int RS, int WR,int CS, int RST, int RD = A0) : MCUFRIEND_kbv(CS, RS, WR, RD, RST) {}
	void InitLCD(byte orientation=LANDSCAPE) {
	     MCUFRIEND_kbv::reset();
		 uint16_t ID = MCUFRIEND_kbv::readID();
		 if (ID == 0) ID = 0x9341;        //DealExtreme with EXTC=0
//		 if (ID == 0x0089 || ID == 0x8989) ID = 0x1289;
		 if (ID == 0x00D3 || ID == 0xD3D3) ID = 0x9481;   //write-only controller
//		 if (ID == 0x00D3 || ID == 0xD3D3) ID = 0x9486;   //write-only controller
//         if (ID == 0x9327 && orientation == LANDSCAPE) orientation = 3;
		 MCUFRIEND_kbv::begin(ID);
		 MCUFRIEND_kbv::setRotation(_orient = orientation);
		 _radius = 4;
    }
	void clrScr() { MCUFRIEND_kbv::fillScreen(0x0000);}
	void drawPixel(int x, int y) { MCUFRIEND_kbv::drawPixel(x, y, _fcolor);}
	void drawLine(int x1, int y1, int x2, int y2) { MCUFRIEND_kbv::drawLine(x1, y1, x2, y2, _fcolor);}
	void fillScr(byte r, byte g, byte b) { MCUFRIEND_kbv::fillScreen(setrgb(r, g, b));}
	void drawRect(int x1, int y1, int x2, int y2) {
		 int w = x2 - x1 + 1, h = y2 - y1 + 1;
	     if (w < 0) { x1 = x2; w = -w; }
         if (h < 0) { y1 = y2; h = -h; }
         MCUFRIEND_kbv::drawRect(x1, y1, w, h, _fcolor);
    }
	void drawRoundRect(int x1, int y1, int x2, int y2) {
		 int w = x2 - x1 + 1, h = y2 - y1 + 1;
	     if (w < 0) { x1 = x2; w = -w; }
         if (h < 0) { y1 = y2; h = -h; }
         MCUFRIEND_kbv::drawRoundRect(x1, y1, w, h, _radius, _fcolor);
    }
	void fillRect(int x1, int y1, int x2, int y2) {
		 int w = x2 - x1 + 1, h = y2 - y1 + 1;
    	 if (w < 0) { x1 = x2; w = -w; }
		 if (h < 0) { y1 = y2; h = -h; }
         MCUFRIEND_kbv::fillRect(x1, y1, w, h, _fcolor);
    }
	void fillRoundRect(int x1, int y1, int x2, int y2) {
		 int w = x2 - x1 + 1, h = y2 - y1 + 1;
	     if (w < 0) { x1 = x2; w = -w; }
         if (h < 0) { y1 = y2; h = -h; }
         MCUFRIEND_kbv::fillRoundRect(x1, y1, w, h, _radius, _fcolor);
    }
	void drawCircle(int x, int y, int radius) { MCUFRIEND_kbv::drawCircle(x, y, radius, _fcolor);}
	void fillCircle(int x, int y, int radius) { MCUFRIEND_kbv::fillCircle(x, y, radius, _fcolor);}
	void setColor(byte r, byte g, byte b)  { MCUFRIEND_kbv::setTextColor(_fcolor = setrgb(r, g, b), _bcolor);}
	void setBackColor(byte r, byte g, byte b)  { MCUFRIEND_kbv::setTextColor(_fcolor, _bcolor = setrgb(r, g, b));}
	void print(const char *st, int x, int y, int deg=0)  {
		 settextcursor((char*)st, x, y); MCUFRIEND_kbv::print(st);}
	void print(char *st, int x, int y, int deg=0)  {
		 settextcursor(st, x, y); MCUFRIEND_kbv::print(st);}
	void print(String st, int x, int y, int deg=0) {
		 MCUFRIEND_kbv::print(st);}
	void printNumI(long num, int x, int y, int length=0, char filler=' ') {
		 char buf[16]; ltoa(num, buf, 10); 
		 settextcursor(buf, x, y); MCUFRIEND_kbv::print(buf);}
	void printNumF(double num, byte dec, int x, int y, char divider='.', int length=0, char filler=' ') {
		 settextcursor((char*)"", x, y); MCUFRIEND_kbv::print(num, dec);}
	void setFont(uint8_t* font) { MCUFRIEND_kbv::setTextSize(1);}

//	void drawBitmap(int x, int y, int sx, int sy, bitmapdatatype data, int scale=1) {
//		 MCUFRIEND_kbv::drawBitmap(x, y, (const uint8_t*)data, sx, sy, _fcolor);}
//	void drawBitmap(int x, int y, int sx, int sy, bitmapdatatype data, int deg, int rox, int roy);
//	void lcdOff();
//	void lcdOn();
//	void setContrast(char c);
	int  getDisplayXSize() { return MCUFRIEND_kbv::width(); }
	int	 getDisplayYSize() { return MCUFRIEND_kbv::height(); }
//	void LCD_Write_DATA(char VH,char VL);
	//		void dispBitmap(File inFile);
	protected:
	uint16_t _fcolor;
	uint16_t _bcolor;
	uint8_t _radius;
	uint8_t _orient;
    void settextcursor(char *st, int x, int y) {
		int pos;
		if (x == CENTER || x == RIGHT) {
			pos = (MCUFRIEND_kbv::width() - strlen(st) * 6);
			if (x == CENTER) x = pos/2;
			else x = pos;
		}			
        MCUFRIEND_kbv::setCursor(x, y);
	}
    uint16_t setrgb(byte r, byte g, byte b)  { return ((r&0xF8) << 8) | ((g&0xFC) << 3) | (b>>3);}
};

#endif /* UTFTGLUE_H_ */