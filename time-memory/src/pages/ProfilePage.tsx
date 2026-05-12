import { useEffect, useState } from 'react'
import type { MemoryStats } from '../types'
import { mockFetchStats } from '../mocks/services'
import PageContainer from '../components/layout/PageContainer'
import ProfileHeader from '../components/profile/ProfileHeader'
import StatGrid from '../components/profile/StatGrid'
import TagCloud from '../components/profile/TagCloud'
import SettingsList from '../components/profile/SettingsList'

export default function ProfilePage() {
  const [stats, setStats] = useState<MemoryStats | null>(null)

  useEffect(() => {
    mockFetchStats().then(setStats)
  }, [])

  return (
    <PageContainer>
      <ProfileHeader />

      <div className="space-y-4">
        {/* Stats */}
        {stats && <StatGrid stats={stats} />}

        {/* Tags */}
        {stats && stats.topTags.length > 0 && <TagCloud tags={stats.topTags} />}

        {/* Settings */}
        <SettingsList />
      </div>

      {/* Footer */}
      <p className="text-center text-small text-text-tertiary py-8">
        在旧时光里，每一张照片都有故事
      </p>
    </PageContainer>
  )
}
