import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const title = searchParams.get('title') || 'Riznime';
        const description = searchParams.get('description') || '';
        const type = searchParams.get('type') as 'anime' | 'manga' | 'donghua' | 'page' || 'page';
        const width = parseInt(searchParams.get('width') || '1200');
        const height = parseInt(searchParams.get('height') || '630');

        const typeColors = {
            anime: '#ff6b6b',
            manga: '#4ecdc4',
            donghua: '#45b7d1',
            page: '#6c5ce7',
        };

        const typeLabels = {
            anime: 'ANIME',
            manga: 'MANGA',
            donghua: 'DONGHUA',
            page: 'RIZNIME',
        };

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1a1a1a',
                        backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
                        position: 'relative',
                    }}
                >
                    {/* Background Pattern */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                        }}
                    />

                    {/* Type Badge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 40,
                            backgroundColor: typeColors[type],
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}
                    >
                        {typeLabels[type]}
                    </div>

                    {/* Logo */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 40,
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        RIZNIME
                    </div>

                    {/* Main Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxWidth: '900px',
                            padding: '0 40px',
                            textAlign: 'center',
                        }}
                    >
                        {/* Title */}
                        <h1
                            style={{
                                fontSize: '48px',
                                fontWeight: 'bold',
                                color: 'white',
                                margin: '0 0 20px 0',
                                lineHeight: '1.2',
                                textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {title}
                        </h1>

                        {/* Description */}
                        {description && (
                            <p
                                style={{
                                    fontSize: '20px',
                                    color: '#e0e0e0',
                                    margin: '0 0 40px 0',
                                    lineHeight: '1.4',
                                    maxWidth: '800px',
                                }}
                            >
                                {description}
                            </p>
                        )}

                        {/* Bottom Text */}
                        <div
                            style={{
                                fontSize: '16px',
                                color: '#b0b0b0',
                                marginTop: '20px',
                            }}
                        >
                            Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            left: 40,
                            width: '60px',
                            height: '4px',
                            backgroundColor: typeColors[type],
                            borderRadius: '2px',
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 40,
                            width: '60px',
                            height: '4px',
                            backgroundColor: typeColors[type],
                            borderRadius: '2px',
                        }}
                    />
                </div>
            ),
            {
                width,
                height,
            }
        );
    } catch (error) {
        console.error('Error generating OpenGraph image:', error);
        return new Response('Error generating image', { status: 500 });
    }
}
