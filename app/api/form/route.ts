import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.formData();
  const zapierHook = body.get('zapier_hook');

  // const formId = body.get('_wpcf7_unit_tag');
  // const endpoint = `${process.env.FORM_ENDPOINT}/${formId}/feedback`;

  const ua = request.headers.get('user-agent') || 'NextFormClient/1.0';
  const referer = request.headers.get('referer') || '';
  const xff =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    '';

  // console.log(ua, referer, xff);

  try {
    if (!zapierHook) {
      throw new Error('No zapier hook provided');
    }

    const res = await fetch(zapierHook, {
      method: 'POST',
      body,
      headers: {
        'User-Agent': ua,
        ...(referer ? { Referer: referer } : {}),
        ...(xff ? { 'X-Forwarded-For': xff } : {}),
      },
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
