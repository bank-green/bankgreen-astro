import { Box, Group, List, Stack, ThemeIcon, Title } from '@mantine/core'
import { CheckCircleIcon } from '@phosphor-icons/react'
import ContactForm, { type ContactFormProps } from './ContactForm'

interface ContactFormContainerProps extends ContactFormProps {
  showList?: boolean
  listItems?: string[]
  title?: string
  className?: string
}

const ContactFormContainer = ({
  title = 'Take action with Bank.Green',
  showList = true,
  listItems = [
    'Learn how to take action on fossil fuel finance.',
    'Discover green banking and how easy it is to switch.',
    'Stay up to date with climate finance news.',
  ],
  className,
  ...rest
}: ContactFormContainerProps) => {
  return (
    <Box data-breakout className={`${className}`}>
      <Box className="contain bg-[url('/img/backgrounds/circle-quarter.svg')] bg-bottom-left bg-cover bg-primaryDark p-8 text-textInverse sm:p-12 md:p-18 lg:rounded-2xl">
        <Group className="-mt-1 items-start justify-between">
          <Stack className="mx-auto w-full max-w-md items-center pt-1 pb-8 lg:ml-0">
            <Title order={1} className="mb-6">
              {title}
            </Title>
            {showList && listItems && (
              <List
                classNames={{
                  root: 'space-y-1 pl-0',
                  item: 'md:text-lg',
                  itemWrapper: 'items-start',
                }}
                icon={
                  <ThemeIcon
                    color="transparent"
                    size={24}
                    radius="xl"
                    className="ml-0 shrink-0 pl-0"
                  >
                    <CheckCircleIcon size={24} className="-mb-2 text-green-500" />
                  </ThemeIcon>
                }
              >
                {listItems.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            )}
          </Stack>

          <Stack className="mx-auto w-full max-w-md items-start justify-center lg:mr-0">
            <ContactForm {...rest} />
          </Stack>
        </Group>
      </Box>
    </Box>
  )
}

export default ContactFormContainer
