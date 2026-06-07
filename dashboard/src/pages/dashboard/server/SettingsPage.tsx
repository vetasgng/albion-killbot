import combinedEventImage from "assets/settings/combinedEventImage.png";
import guildTags from "assets/settings/guildTags.png";
import showAttunement from "assets/settings/showAttunement.png";
import splitLootValue from "assets/settings/splitLootValue.png";
import LoadError from "components/LoadError";
import Settings from "components/Settings";
import Loader from "components/common/Loader";
import SettingHelp from "components/dashboard/SettingHelp";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { getLocaleName } from "helpers/utils";
import { Form, Stack } from "react-bootstrap";
import { useGetConstantsQuery } from "store/api";
import {
  setGeneralGuildTags,
  setGeneralLocale,
  setGeneralShowAttunement,
  setGeneralSplitLootValue,
  setGeneralCombinedEventImage,
} from "store/settings";

const SettingsPage = () => {
  const constants = useGetConstantsQuery();
  const general = useAppSelector((state) => state.settings.general);
  const dispatch = useAppDispatch();

  if (constants.isFetching) return <Loader />;
  if (!constants.data) return <LoadError />;

  const { languages } = constants.data;

  return (
    <Settings>
      <Stack gap={2}>
        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Select
            aria-label="Language select"
            value={general.locale}
            onChange={(e) => dispatch(setGeneralLocale(e.target.value))}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {getLocaleName(lang)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="showAttunement">
          <Form.Switch>
            <Form.Switch.Input
              checked={general.showAttunement}
              type="checkbox"
              onChange={(e) =>
                dispatch(setGeneralShowAttunement(e.target.checked))
              }
            />
            <Form.Switch.Label>
              <Stack
                direction="horizontal"
                gap={1}
                className="align-items-center"
              >
                <div>Show Attunement</div>
                <SettingHelp
                  title="Show Attunement"
                  imageSrc={showAttunement}
                  imageAlt="Example of Show Attunement"
                >
                  Display awakened weapon attributes on kill reports
                </SettingHelp>
              </Stack>
            </Form.Switch.Label>
          </Form.Switch>
        </Form.Group>

        <Form.Group controlId="guildTags">
          <Form.Switch>
            <Form.Switch.Input
              checked={general.guildTags}
              type="checkbox"
              onChange={(e) => dispatch(setGeneralGuildTags(e.target.checked))}
            />
            <Form.Switch.Label>
              <Stack
                direction="horizontal"
                gap={1}
                className="align-items-center"
              >
                <div>Show Guild Tags</div>
                <SettingHelp
                  title="Show Guild Tags"
                  imageSrc={guildTags}
                  imageAlt="Example of Guild Tags"
                >
                  When bot mentions a player, show the guild
                </SettingHelp>
              </Stack>
            </Form.Switch.Label>
          </Form.Switch>
        </Form.Group>

        <Form.Group controlId="splitLootValue">
          <Form.Switch>
            <Form.Switch.Input
              checked={general.splitLootValue}
              type="checkbox"
              onChange={(e) =>
                dispatch(setGeneralSplitLootValue(e.target.checked))
              }
            />
            <Form.Switch.Label>
              <Stack
                direction="horizontal"
                gap={1}
                className="align-items-center"
              >
                <div>Split Loot Value</div>
                <SettingHelp
                  title="Split Loot Value"
                  imageSrc={splitLootValue}
                  imageAlt="Example of Split Loot"
                >
                  Split the loot value between gear and inventory
                </SettingHelp>
              </Stack>
            </Form.Switch.Label>
          </Form.Switch>
        </Form.Group>

        <Form.Group controlId="combinedEventImage">
          <Form.Switch>
            <Form.Switch.Input
              checked={general.combinedEventImage}
              type="checkbox"
              onChange={(e) =>
                dispatch(setGeneralCombinedEventImage(e.target.checked))
              }
            />
            <Form.Switch.Label>
              <Stack
                direction="horizontal"
                gap={1}
                className="align-items-center"
              >
                <div>Combined Kill Image</div>
                <SettingHelp
                  title="Combined Kill Image"
                  imageSrc={combinedEventImage}
                  imageAlt="Example of Combined Kill"
                >
                  Append victim inventory to kill report images instead of
                  sending a separate inventory image
                </SettingHelp>
              </Stack>
            </Form.Switch.Label>
          </Form.Switch>
        </Form.Group>
      </Stack>
    </Settings>
  );
};

export default SettingsPage;
