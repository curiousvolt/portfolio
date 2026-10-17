import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import fs from 'fs'
import path from 'path'

const MontserratRegular = fs.readFileSync(
  path.resolve('./public/fonts2/_montserrat_regular.ttf'),
)
const MontserratBold = fs.readFileSync(
  path.resolve('./public/fonts2/_montserrat_bold.ttf'),
)
const CV_PATH_1 = 'M1010.76 1139.13L1010.96 1139.83L1011.12 1140.37L1010.27 1140.37L1010.76 1139.13Z'
const CV_PATH_2 = 'M1057.11 1139.83L1010.96 1139.83L1011.12 1140.37L1010.27 1140.37L1010.76 1139.13L991.302 1073.59L988.056 1062.66L944.655 916.437L929.006 863.715L925.566 852.124L884.468 713.665L841.722 569.653L736.681 215.765L728.367 187.754L671.987 187.748L632.24 187.752L629.999 187.747L629.958 187.747L625.36 187.752L585.611 187.75L698.967 569.649L741.713 713.661L824.003 990.9L836.928 1034.45L844.335 1059.4L868.367 1140.36L868.999 1142.49L885.234 1197.2L911.112 1284.38L953.833 1284.38L957.74 1284.37L1000.46 1284.37L1098.83 1284.38L1100.5 1284.38L1145.46 1284.38L1201.89 1140.37L1369.11 713.676L1425.55 569.666L1378.92 569.669L1280.55 569.662L1233.93 569.665L1227.88 569.661L1377.55 187.769L1394.69 144.033L1451.12 0.0241415L1404.5 0.0270533L1306.13 0.0198286L1259.5 0.022735L719.266 0.00236896L672.639 0.00531131L638.883 -1.88257e-05L638.194 0.000339819L637.604 0.00124786L636.95 0.00312714L636.636 0.00420658C616.72 0.0797668 596.982 1.1677 577.467 3.22208C577.054 3.26569 576.64 3.30973 576.226 3.35409L576.182 3.35905L575.87 3.39265L575.827 3.39719L575.297 3.45472C561.824 4.92372 548.458 6.85327 535.215 9.22819C246.366 61.0281 15.871 324.689 0.780339 642.163C-16.0784 996.83 242.277 1284.35 577.832 1284.36L756.169 1284.37L802.797 1284.37L867.076 1284.37L841.2 1197.2L824.58 1142.5L812.57 1142.5L781.182 1142.5L779.869 1142.49L733.242 1142.49L731.929 1142.49L685.302 1142.49L636.049 1142.49L628.479 1142.49L589.421 1142.49L584.576 1142.48C323.155 1142.48 121.878 918.477 135.012 642.167C147.188 386.008 339.367 174.819 575.628 145.383C589.105 143.704 602.725 142.616 616.463 142.145L616.826 142.133L616.936 142.129L616.991 142.128L617.017 142.127L617.036 142.126L617.303 142.117L617.581 142.109L618.016 142.095L618.247 142.088L618.682 142.075C622.251 141.97 625.829 141.903 629.415 141.881L629.55 141.881L629.804 141.881L629.861 141.881L630.155 141.881L630.549 141.88L630.622 141.88L631.013 141.878L631.027 141.878L631.441 141.878L631.618 141.877L631.876 141.877L632.139 141.877L676.042 141.878L715.202 141.884L761.829 141.881L969.032 141.892L1015.66 141.889L1086.11 141.895L1132.73 141.892L1144.64 141.897L1191.27 141.894L1203.18 141.898L1249.81 141.896L1232.55 187.765L1166.33 356.744L1082.89 569.656L1080.69 575.279L1035.7 690.068L1026.45 713.666L1026.88 713.67L1031.66 713.666L1073.51 713.667L1124.82 713.673L1162.19 713.674L1171.45 713.67L1177.49 713.674L1208.82 713.671L1224.12 713.671L1189.02 803.216L1143.85 918.494L1057.38 1139.13L1057.11 1139.83Z'

const dimensions = {
  width: 1200,
  height: 630,
}

const colors = {
  background: {
    from: '#2c2c2c',
    via: '#181818',
    to: '#000000',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b8b8b8',
    muted: '#7a7a7a',
  },
  accent: {
    primary: 'rgba(112, 112, 112, 0.5)',
    secondary: 'rgba(21, 21, 21, 0.8)',
    highlight: 'rgba(255, 255, 255, 0.05)',
  },
}

interface Props {
  title: string
  date?: Date
  description: string
  tags?: string[]
  type?: 'blog' | 'project'
}

export async function GET(context: APIContext) {
  const { title, date, description, tags = [], type = 'blog' } = context.props as Props

  const badgeText = type === 'project'
    ? 'PROJECT SHOWCASE'
    : (date ? date.toLocaleDateString('en-US', { dateStyle: 'full' }) : 'ARTICLE')

  const tagElements = tags
    .map(
      (tag) =>
        `<div style="background: rgba(21, 21, 21, 0.6); color: #e0e0e0; font-size: 14px; font-weight: 500; padding: 6px 14px; border-radius: 18px; margin: 4px; display: flex; border: 1px solid rgba(255, 255, 255, 0.1);">#${tag}</div>`,
    )
    .join('')

  const markup = html(
    `<div
      style="display: flex; flex-direction: column; width: 100%; height: 100%; border-radius: 24px; overflow: hidden; color: white; border: 1px solid rgba(255, 255, 255, 0.12); position: relative; background: #121314;"
    >
      <div style="position: absolute; display: flex; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.01); opacity: 0.6;"></div>

      <!-- Ambient glow -->
      <div style="position: absolute; width: 450px; height: 450px; display: flex; background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%); top: -120px; right: -60px; border-radius: 50%;"></div>
      <div style="position: absolute; width: 400px; height: 400px; display: flex; background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%); bottom: -100px; left: -60px; border-radius: 50%;"></div>

      <div style="flex: 4; padding: 48px 54px; display: flex; flex-direction: column; justify-content: center; position: relative;">
        <div style="color: ${type === 'project' ? '#10b981' : colors.text.secondary}; font-size: 15px; display: flex; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">
          ${badgeText}
        </div>

        <div
          style="font-size: 56px; display: flex; font-weight: 800; color: ${colors.text.primary}; line-height: 1.15; margin-top: 18px; letter-spacing: -0.02em; width: 95%;"
        >
          ${title}
        </div>

        <div style="width: 70px; height: 4px; display: flex; background: linear-gradient(90deg, #10b981, rgba(16, 185, 129, 0.2)); margin: 20px 0; border-radius: 2px;"></div>

        <div style="color: ${colors.text.secondary}; font-size: 20px; display: flex; margin-top: 12px; line-height: 1.55; width: 92%;">
          ${description}
        </div>

        <div style="display: flex; margin-top: 26px; flex-wrap: wrap;">
          ${tagElements}
        </div>
      </div>

      <div
        style="flex: 1; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; padding: 26px 54px; align-items: center; justify-content: space-between; font-size: 20px; background: rgba(0,0,0,0.35); position: relative;"
      >
        <div style="display: flex; align-items: center;">
          <div style="width: 6px; height: 26px; display: flex; background: #10b981; margin-right: 14px; border-radius: 3px;"></div>
          <span style="color: ${colors.text.secondary}; font-weight: 500; letter-spacing: 0.02em; font-size: 19px;">curiousvolt.is-a.dev</span>
        </div>

        <div style="display: flex; align-items: center; background: rgba(21,21,21, 0.85); border-radius: 18px; padding: 10px 20px; border: 1px solid rgba(255, 255, 255, 0.12);">
          <svg width="40" height="35" viewBox="0 0 1452 1285" fill="none" style="display: flex;">
            <path fill-rule="evenodd" clip-rule="evenodd" d="${CV_PATH_1}" fill="#ffffff" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="${CV_PATH_2}" fill="#ffffff" />
          </svg>
          <div style="display: flex; flex-direction: column; margin-left: 16px; border-left: 1px solid rgba(255, 255, 255, 0.12); padding-left: 16px;">
            <span style="color: ${colors.text.primary}; font-weight: 600; font-size: 17px;">Aman Kumar</span>
            <span style="color: ${colors.text.muted}; font-size: 13px;">@curiousvolt</span>
          </div>
        </div>
      </div>
    </div>`,
  ) as unknown as React.ReactNode

  const svg = await satori(markup, {
    fonts: [
      {
        name: 'Montserrat',
        data: MontserratRegular,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Montserrat',
        data: MontserratBold,
        weight: 700,
        style: 'normal',
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
    debug: false,
  })

  const image = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: dimensions.width,
    },
    font: {
      fontFiles: [
        MontserratRegular.toString('base64'),
        MontserratBold.toString('base64'),
      ],
      loadSystemFonts: true,
      defaultFontFamily: 'Montserrat',
    },
    logLevel: 'error',
    background: 'transparent',
    imageRendering: 1,
    shapeRendering: 2,
    textRendering: 1,
    dpi: 144,
  }).render()

  const pngData = image.asPng()

  return new Response(pngData as any, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="social-card.png"',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': pngData.length.toString(),
      'Surrogate-Key': tags.join(' '),
      'Query-String-Hash': title.toLowerCase().replace(/\s+/g, '-'),
      'Cache-Tag': 'social-image',
      'X-Content-Type-Options': 'nosniff',
      'Last-Modified': new Date().toUTCString(),
      Expires: new Date(Date.now() + 31536000000).toUTCString(),
      ETag: `"${pngData.length}-${Date.now()}"`,
      'Access-Control-Allow-Origin': '*',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  })
}

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  const projects = await getCollection('projects')

  const blogPaths = posts.map((post) => ({
    params: {
      id: post.id,
    },
    props: {
      title: post.data.title,
      date: post.data.date,
      description: post.data.description,
      tags: post.data.tags || [],
      type: 'blog' as const,
    },
  }))

  const projectPaths = projects.map((project) => ({
    params: {
      id: project.id,
    },
    props: {
      title: project.data.name,
      date: project.data.startDate ? new Date(project.data.startDate) : undefined,
      description: project.data.description,
      tags: project.data.tags || [],
      type: 'project' as const,
    },
  }))

  return [...blogPaths, ...projectPaths]
}
